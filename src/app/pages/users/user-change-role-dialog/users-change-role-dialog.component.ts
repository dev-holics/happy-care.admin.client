import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GENDER } from 'src/app/shared/gender';
import { passwordFormat, passwordValidator, phoneNumberFormat, phoneNumberValidator } from 'src/app/shared/utils/app-validators';
import { BranchModel } from 'src/app/pages/branches/models/branch.model';
import { RoleOption } from 'src/app/_models/role';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-users-change-role-dialog',
  templateUrl: './users-change-role-dialog.component.html',
  styleUrls: ['./users-change-role-dialog.component.scss']
})
export class UserChangeRoleDialogComponent implements OnInit {

  @Input('display') display: boolean;
  @Input('roles') roles: RoleOption[];
  @Input('branches') branches: BranchModel[];
  @Input('Id') id: string;
  @Output() closeDialog = new EventEmitter<any>();
  public phamarcistId = '8902b1b3-a5be-4fff-9d29-1460b90641e9';
  public form: FormGroup;
  submitted = false;
  constructor(public fb: FormBuilder, public usersService: UsersService) {
    this.form = this.fb.group({
      'role': [null, Validators.compose(
        [
          Validators.required
        ]
      )],
      'branch': [null],
      });
  }

  ngOnInit(): void {
    if(this.id) {
      this.usersService.getUserById(this.id).subscribe(
        (response: any) => {
          this.form.patchValue({
            role: response.role.id,
            branch: response.branch.id
          })
        }
      )
    }
  }

  public get isVisible(): boolean {
    return this.display;
  }

  public set isVisible(val: boolean) {
    this.close(null);
  }

  close(user: any): void {
    if(user) {
      this.closeDialog.emit({id: this.id, user});
    } else {
      this.closeDialog.emit(null);
    }
    this.form.reset();
  }

}
