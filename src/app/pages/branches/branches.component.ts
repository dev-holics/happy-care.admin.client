import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Branch, BranchCreateUpdate, City } from 'src/app/_models/branch';
import decode from "jwt-decode";
import { AccountsService } from 'src/app/_services/accounts.service';
import { BranchsService } from 'src/app/_services/branches.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  branches: Branch[] = []
  public cityOptions: City[] = []
  public displayDialog: boolean;
  public selectedId: string;
  public page: number = 1;
  public limit: number = 10;
  public totalData: number = 0;
  public canUpdate: boolean = true;
  public canAdd: boolean = true;
  public canDelete: boolean = true;

  constructor(
    public branchService: BranchsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.fetchBranches();
    this.fetchCities();
    const currentUser = this.accountsService.currentUserValue;
    if (currentUser) {
      const tokenPayload:any = decode(currentUser.accessToken)
      const permissions = tokenPayload.role.permissions;

      this.canAdd = this.isAccess(permissions, 'create_branch');
      this.canUpdate = this.isAccess(permissions, 'update_branch');
      this.canDelete = this.isAccess(permissions, 'delete_branch');
    }
  }

  isAccess(permissions: any, permission: string) {
    return permissions.some((x) => x.name == permission);
  }

  fetchCities() {
    this.branchService.getCities().subscribe(
      (response: any) => {
        this.cityOptions = response.data;
      }
    )
  }

  fetchBranches() {
    this.branches = [];
    this.branchService.getBranches(this.page, this.limit, "", "").subscribe(
      (response: any) => {
        this.page = response.currentPage;
        this.limit = response.limit;
        this.totalData = response.totalData;
        this.branches = response.data;
      }
    )
  }

  public addBranch(branch: BranchCreateUpdate) {
    this.branchService
      .create(branch)
      .subscribe((response) =>
      {
        this.fetchBranches()
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      });
  }

  public updateBranch(id: string, branch: BranchCreateUpdate) {
    this.branchService
      .put(id, branch)
      .subscribe((response) =>
      {
        this.fetchBranches()
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      });
  }

  paginate(event): void {
    this.limit = event.rows;
    this.page = event.first / event.rows + 1;
    document.getElementById('main-content')!.scrollTop = 0;
    this.fetchBranches();
  }

  openDialog(id: string | null): void {
    this.displayDialog = true;
    if (id) {
      this.selectedId = id;
    } else {
      this.selectedId = '';
    }
  }

  onHideDialog(data: any): void {
    this.displayDialog = false;
    if (data) {
      data.id ? this.updateBranch(data.id, data.branch) : this.addBranch(data.branch);
    }
  }

  openConfirmDialog(trademark): void {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xoá danh mục này không',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      // accept: () => {
      //   this.deleteTrademark(trademark);
      //   this.messageService.add({
      //     severity: 'info',
      //     summary: 'Confirmed',
      //     detail: 'Record deleted',
      //   });
      // },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
}
