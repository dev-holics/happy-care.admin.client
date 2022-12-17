import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Permission, Role, RoleUpdate, PermissionStatus } from 'src/app/_models/role';
import { RolesService } from 'src/app/_services/roles.service';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.scss']
})
export class RolesDialogComponent implements OnInit {

  @Input('display') display: boolean;
  @Input('Id') id: string;
  @Output() closeDialog = new EventEmitter<any>();
  roleUpdate: RoleUpdate;
  role: Role;
  permissions: Permission[] = [];
  permissionsState: PermissionStatus[] = [];
  initPermissionsState: PermissionStatus[] = [];

  categoryPermissions: Permission[] = [];
  basicPermissions: Permission[] = [];
  userPermissions: Permission[] = [];
  productPermissions: Permission[] = [];
  productLogPermissions: Permission[] = [];
  permissionPermissions: Permission[] = [];
  rolePermissions: Permission[] = [];
  cartPermissions: Permission[] = [];
  branchPermissions: Permission[] = [];
  originPermissions: Permission[] = [];
  feedBackPermissions: Permission[] = [];

  public form: FormGroup;
  submitted = false;
  constructor(
    public fb: FormBuilder,
    public rolesService: RolesService) {
    this.form = this.fb.group({
      'name': [null, Validators.compose(
        [
          Validators.required,
          Validators.maxLength(512)
        ])],
      'description': [null, Validators.compose(
        [
          Validators.maxLength(1024),
        ])],
      'permissions': [[]]
      });
  }

  ngOnInit(): void {
    if(this.id) {
      this.rolesService.getRolesById(this.id).subscribe(
        (response: any) => {
          this.role = response;
          this.form.patchValue({
            name: response.name,
            description: response.description,
          })
        }
      )
    } else {
      this.roleUpdate = new RoleUpdate();
    }

    this.rolesService.getPermission().subscribe(
      (response: Permission[]) => {
        this.permissions = response;

        for (const element of response)
        {
          const status = this.role.permissions.filter(permission => permission.id === element.id).length > 0;

          this.permissionsState.push(new PermissionStatus(element.id, status));
          this.initPermissionsState.push(new PermissionStatus(element.id, status));
        }
        this.categoryPermissions = this.permissions.filter((permission) => { return permission.module === "CATEGORY"});
        this.basicPermissions = this.permissions.filter((permission) => { return permission.module === "BASIC"});
        this.userPermissions = this.permissions.filter((permission) => { return permission.module === "USER"});
        this.permissionPermissions = this.permissions.filter((permission) => { return permission.module === "PERMISSION"});
        this.productPermissions = this.permissions.filter((permission) => { return permission.module === "PRODUCT"});
        this.productLogPermissions = this.permissions.filter((permission) => { return permission.module === "PRODUCT_LOG"});
        this.rolePermissions = this.permissions.filter((permission) => { return permission.module === "ROLE"});
        this.cartPermissions = this.permissions.filter((permission) => { return permission.module === "CART"});
        this.originPermissions = this.permissions.filter((permission) => { return permission.module === "ORIGIN"});
        this.branchPermissions = this.permissions.filter((permission) => { return permission.module === "BRANCH"});
        this.feedBackPermissions = this.permissions.filter((permission) => { return permission.module === "FEEDBACK"});
      }
    )
  }

  public get isVisible(): boolean {
    return this.display;
  }

  public set isVisible(val: boolean) {
    this.close(null);
  }

  close(role: RoleUpdate | null): void {
    if(role) {
      this.roleUpdate = new RoleUpdate();
      this.roleUpdate.name = role.name;
      this.roleUpdate.description = role.description;
      this.roleUpdate.permissions = this.permissionsState.filter(permission => permission.status)
        .map(permission => permission.id);
      this.closeDialog.emit({id: this.id, role: this.roleUpdate});
    } else {
      this.closeDialog.emit(null);
    }
    this.form.reset();
  }

  handleChangePermission(id: string) {
    let permission = this.permissionsState.find(permission => permission.id === id);
    if (!permission) return;
    permission.status = !permission.status;
  }
  isChecked(id: string) : boolean {
    let permission = this.permissionsState.find(permission => permission.id === id);
    if (!permission) return false;
    return permission.status;
  }
}
