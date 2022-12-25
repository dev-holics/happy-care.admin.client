import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ModuleOption, PermissionCreate, PermissionUpdate } from 'src/app/_models/permissions';
import { Permission } from 'src/app/_models/role';
import { AccountsService } from 'src/app/_services/accounts.service';
import { PermissionsService } from 'src/app/_services/permissions.service';
import { MODULES } from './permissions';
import decode from "jwt-decode";

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  permissions: Permission[] = []
  public moduleOptions: ModuleOption[] = MODULES
  public displayDialog: boolean;
  public moduleId: string = '';
  public selectedId: string;
  public page: number = 1;
  public limit: number = 10;
  public totalData: number = 0;
  public canAdd: boolean = true;
  public canUpdate: boolean = true;

  constructor(
    public permissionsService: PermissionsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.fetchPermissions();
    const currentUser = this.accountsService.currentUserValue;
    if (currentUser) {
      const tokenPayload:any = decode(currentUser.accessToken)
      const permissions = tokenPayload.role.permissions;

      this.canAdd = this.isAccess(permissions, 'create_permission');
      this.canUpdate = this.isAccess(permissions, 'update_permission');
    }
  }

  isAccess(permissions: any, permission: string) {
    return permissions.some((x) => x.name == permission);
  }
  fetchPermissions() {
    this.permissions = [];
    this.permissionsService.getPermission(this.page, this.limit, this.moduleId).subscribe(
      (response: any) => {
        this.page = response.currentPage;
        this.limit = response.limit;
        this.totalData = response.totalData;
        this.permissions = response.data;
      }
    )
  }

  onChangeModule(event: any) {
    this.fetchPermissions();
  }

  paginate(event): void {
    this.limit = event.rows;
    this.page = event.first / event.rows + 1;
    document.getElementById('main-content')!.scrollTop = 0;
    this.fetchPermissions();
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
      data.id ? this.updatePermission(data.id, data.permission) : this.addPermission(data.permission);
    }
  }

  public addPermission(permission: PermissionCreate) {
    this.permissionsService
      .create(permission)
      .subscribe((response) =>
      {
        this.fetchPermissions()
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      });
  }

  public updatePermission(id: string, permission: PermissionUpdate) {
    this.permissionsService
      .put(id, permission)
      .subscribe((response) =>
      {
        this.fetchPermissions()
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      });
  }

  openInActiveDialog(permissionId: string) : void {
    this.confirmationService.confirm({
      message: 'Bạn có muốn ngừng hoạt động quyền này không',
      header: 'Xác nhận ngừng hoạt động',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.permissionsService.inActivePermission(permissionId).subscribe(
          (response) => {
          }
        );
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Quyền vừa được ngưng hoạt động thành công',
        });
        this.fetchPermissions();
      },
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
    })
  }

  openActiveDialog(permissionId: string) : void {
    this.confirmationService.confirm({
      message: 'Bạn có muốn hoạt động quyền này trở lại không không',
      header: 'Xác nhận hoạt động',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.permissionsService.activePermission(permissionId).subscribe(
          (response) => {
          }
        );
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Quyền vừa được hoạt động thành công',
        });
        this.fetchPermissions();
      },
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
    })
  }
}
