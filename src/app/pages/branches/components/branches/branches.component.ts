import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { BranchModel, CityModel, DistrictModel } from 'src/app/pages/branches/models/branch.model';
import decode from "jwt-decode";
import { AccountsService } from 'src/app/_services/accounts.service';
import { BranchesService } from 'src/app/pages/branches/services/branches.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class BranchesComponent implements OnInit {

  public branches: BranchModel[] = [];
  public cities: CityModel[] = [];
  public districts: DistrictModel[] = [];
  public displayDialog: boolean;
  public branch: BranchModel;

  public paginator: any = {
    page: 1,
    limit: 10,
    totalData: 0,
  }

  public searchData: any = {
    cityId: null,
    districtId: null,
    searchText: null
  }

  public canUpdate: boolean = true;
  public canAdd: boolean = true;
  public canDelete: boolean = true;

  constructor(
    public branchesService: BranchesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private accountsService: AccountsService) { }

  async ngOnInit(): Promise<void> {
    await this.getBranches();
    await this.getCities();
    await this.getDistricts();
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

  async getBranches(): Promise<void> {
    const query = {
      page: this.paginator.page,
      limit: this.paginator.limit,
      cityId: this.searchData.cityId,
      districtId: this.searchData.districtId,
      searchText: this.searchData.searchText
    }
    const res = await this.branchesService.getBranches(query);
    this.branches = res.data;
    this.paginator = res.paginator;
  }

  async getCities(): Promise<void> {
    const res = await this.branchesService.getCities();
    this.cities = res;
  }

  async getDistricts(): Promise<void> {
    const res = await this.branchesService.getDistricts();
    res.map((d) => {
      d.cityId = d.city.id;
    });
    this.districts = res;
  }

  async addBranch(branch: BranchModel): Promise<void> {
    await this.branchesService.addBranch(branch);
    await this.getBranches();
  }

  async updateBranch(branch: BranchModel): Promise<void> {
    await this.branchesService.updateBranch(branch);
    await this.getBranches();
  }

  paginate(event): void {
    this.paginator.limit = event.rows;
    this.paginator.page = event.first / event.rows + 1;
    document.getElementById('main-content')!.scrollTop = 0;
    this.getBranches();
  }

  openDialog(branch: BranchModel | null): void {
    console.log(branch);
    this.displayDialog = true;
    if (branch) {
      this.branch = branch;
    } else {
      this.branch = new BranchModel();
    }
  }

  onHideDialog(branch: BranchModel): void {
    this.displayDialog = false;
    if (branch) {
      branch.id = this.branch.id;
      branch.id ? this.updateBranch(branch) : this.addBranch(branch);
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
