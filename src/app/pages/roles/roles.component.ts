import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Role, RoleUpdate } from 'src/app/_models/role';
import { RolesService } from 'src/app/_services/roles.service';

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

  constructor(public rolesService: RolesService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.fetchRoles();
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
