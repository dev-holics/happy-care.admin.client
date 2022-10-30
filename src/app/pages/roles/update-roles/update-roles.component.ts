import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Permission, Role, PermissionStatus, RoleUpdate } from 'src/app/_models/role';
import { NotificationService } from 'src/app/_services/notification.service';
import { RolesService } from 'src/app/_services/roles.service';

@Component({
  selector: 'app-update-roles',
  templateUrl: './update-roles.component.html',
  styleUrls: ['./update-roles.component.scss']
})
export class UpdateRolesComponent implements OnInit {

  role: Role;
  submitted = false;
  inputChanged = false;
  id: string;
  updateRole: RoleUpdate;
  permissions: Permission[] = [];
  permissionsState: PermissionStatus[] = [];
  initPermissionsState: PermissionStatus[] = [];

  categoryPermissions: Permission[] = [];
  basicPermissions: Permission[] = [];
  userPermissions: Permission[] = [];
  productPermissions: Permission[] = [];
  permissionPermissions: Permission[] = [];
  rolePermissions: Permission[] = [];
  cartPermissions: Permission[] = [];
  branchPermissions: Permission[] = [];
  originPermissions: Permission[] = [];
  feedBackPermissions: Permission[] = [];
  public form: FormGroup;

  constructor(
    public rolesService: RolesService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public alertService: NotificationService,
    public router: Router
    ) {
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
    this.id = this.route.snapshot.queryParams?.id;
    this.rolesService.getRolesById(this.id).subscribe(
      (response: Role) => {
        this.role = response;
        if (!this.role.permissions) {
          this.role.permissions = [];
        }
      }
    )
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
        this.rolePermissions = this.permissions.filter((permission) => { return permission.module === "ROLE"});
        this.cartPermissions = this.permissions.filter((permission) => { return permission.module === "CART"});
        this.originPermissions = this.permissions.filter((permission) => { return permission.module === "ORIGIN"});
        this.branchPermissions = this.permissions.filter((permission) => { return permission.module === "BRANCH"});
        this.feedBackPermissions = this.permissions.filter((permission) => { return permission.module === "FEEDBACK"});
      }
    )

    this.form.valueChanges.subscribe((currentValue) => {
      if (!_.isEqual(_.omit(currentValue, 'permissions'), _.omit(this.role, ['id', 'accessLevel', 'isActive', 'permissions']))) {
        this.inputChanged = true;
      } else {
        this.inputChanged = false;
      }
    });
  }

  public onSubmit(values:Object) : void {
    this.submitted = true;
    if (this.form.status) {
      this.updateRole = new RoleUpdate();
      this.updateRole.name = this.form.value.name;
      this.updateRole.description = this.form.value.description;
      this.updateRole.permissions = this.permissionsState.filter(permission => permission.status)
        .map(permission => permission.id);
      this.rolesService.put(this.id, this.updateRole).subscribe(
        (response) => {
          this.alertService.showSuccess(response.message, "");
          this.router.navigate(['/roles']);
        },
        (error) => {
          console.log(error.error);
          this.alertService.showError(error.error.errors[0].message, "");
        },
      );}
  }
  handleChangePermission(id: string) {
    let permission = this.permissionsState.find(permission => permission.id === id);
    if (!permission) return;
    permission.status = !permission.status;
    if (!_.isEqual(this.permissionsState, this.initPermissionsState)) {
      this.inputChanged = true;
    } else {
      this.inputChanged = false;
    }
  }
  isChecked(id: string) : boolean {
    let permission = this.permissionsState.find(permission => permission.id === id);
    if (!permission) return false;
    return permission.status;
  }
}
