import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Role, RoleUpdate } from 'src/app/_models/role';
import { AccountsService } from 'src/app/_services/accounts.service';
import { RolesService } from 'src/app/_services/roles.service';
import decode from "jwt-decode";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roles: Role[] = [];
  p: number = 1;
  public displayDialog: boolean;
  public selectedId: string;
  public page: number = 1;
  public limit: number = 10;
  public totalData: number = 0;
  public canAdd: boolean = true;
  public canUpdate: boolean = true;

  constructor(public rolesService: RolesService,
    private messageService: MessageService,
    private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.fetchRoles();
    const currentUser = this.accountsService.currentUserValue;
    if (currentUser) {
      const tokenPayload:any = decode(currentUser.accessToken)
      const permissions = tokenPayload.role.permissions;

      this.canUpdate = this.isAccess(permissions, 'update_role');
    }
  }

  isAccess(permissions: any, permission: string) {
    return permissions.some((x) => x.name == permission);
  }
  fetchRoles() : void {
    this.rolesService.getRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
      }
    )
  }

  public updateRoles(id: string, role: RoleUpdate) {
    this.rolesService
      .put(id, role)
      .subscribe((response) =>
      {
        this.fetchRoles()
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
    this.fetchRoles();
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
    console.log(data);
    if (data && data.id) {
      this.updateRoles(data.id, data.role);
    }
  }
}
