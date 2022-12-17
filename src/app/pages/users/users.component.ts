import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Branch } from 'src/app/_models/branch';
import { RoleOption } from 'src/app/_models/role';
import { UserCreate, UserDto } from 'src/app/_models/user';
import { BranchsService } from 'src/app/_services/branchs.service';
import { RolesService } from 'src/app/_services/roles.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: UserDto[] = [];
  public roleOptions: RoleOption[];
  public branchOptions: Branch[] = []
  public displayDialog: boolean;
  public displayChangeRoleDialog: boolean;
  public selectedId: string;
  public page: number = 1;
  public limit: number = 10;
  public totalData: number = 0;

  constructor(
    public usersService: UsersService,
    public branchesService: BranchsService,
    public rolesService: RolesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchOptions();
  }

  fetchUsers() {
    this.users = [];
    this.usersService.getUsers(this.page, this.limit).subscribe(
      (response: any) => {
        this.page = response.currentPage;
        this.limit = response.limit;
        this.totalData = response.totalData;
        this.users = response.data;
      }
    )
  }

  fetchOptions() {
    this.rolesService.getRoles().subscribe(
      (response: any) => {
        this.roleOptions = response;
      }
    )
    this.branchesService.getBranches(0, 200).subscribe(
      (response: any) => {
        this.branchOptions = response.data;
      }
    )
  }

  paginate(event): void {
    this.limit = event.rows;
    this.page = event.first / event.rows + 1;
    document.getElementById('main-content')!.scrollTop = 0;
    this.fetchUsers();
  }


  openDialog(id: string | null): void {
    this.displayDialog = true;
    if (id) {
      this.selectedId = id;
    } else {
      this.selectedId = '';
    }
  }

  openChangeRoleDialog(id: string | null): void {
    this.displayChangeRoleDialog = true;
    if (id) {
      this.selectedId = id;
    } else {
      this.selectedId = '';
    }
  }

  onHideDialog(data: any): void {
    this.displayDialog = false;
    if (data) {
      data.id ? this.updateUserInfo(data.id, data.user) : this.addUser(data.user);
    }
  }

  onHideChangeRoleDialog(data: any): void {
    this.displayChangeRoleDialog = false;
    if (data) {
      this.updateUserRole(data.id, data.user.role, data.user.branch);
    }
  }

  public addUser(user: UserCreate) {
    this.usersService
      .create(user)
      .subscribe((response) =>
      {
        this.fetchUsers()
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      });
  }

  public updateUserRole(id: string, roleId: string, branchId: string) {
    this.usersService
      .updateRole(id, roleId, branchId)
      .subscribe((response) =>
      {
        this.fetchUsers()
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      });
  }

  public updateUserInfo(id: string, userUpdate: UserCreate) {
    this.usersService
      .updateUser(id, userUpdate)
      .subscribe((response) =>
      {
        this.fetchUsers()
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      });
  }
}
