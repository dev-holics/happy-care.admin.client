import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordFormat, passwordValidator, phoneNumberFormat, phoneNumberValidator } from 'src/app/shared/utils/app-validators';
import { GENDER } from 'src/app/shared/config/enum.config';
import { BranchModel } from 'src/app/pages/branches/models/branch.model';
import { RoleOption } from 'src/app/_models/role';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent implements OnInit {

  @Input('display') display: boolean;
  @Input('roles') roles: RoleOption[];
  @Input('branches') branches: BranchModel[];
  @Input('Id') id: string;
  @Output() closeDialog = new EventEmitter<any>();
  public phamarcistId = '9cc4e0cc-b225-48db-adeb-b96b1fc116f1';
  public form: FormGroup;
  public gender = [
    { id: GENDER.MALE, name: 'Nam' },
    { id: GENDER.FEMALE, name: 'Nữ' },
  ];;
  submitted = false;
  constructor(public fb: FormBuilder, public usersService: UsersService) {
    this.form = this.fb.group({
      'phoneNumber': [null, Validators.compose(
        [
          Validators.required,
          Validators.maxLength(20),
          phoneNumberValidator
        ])],
      'fullname': [null, Validators.compose(
        [
          Validators.required,
          Validators.maxLength(512),
        ]
      )],
      'email': [null, Validators.compose(
        [
          Validators.email,
          Validators.required
        ]
      )
      ],
      'gender': [null],
      'role': [null, Validators.compose(
        [
          Validators.required
        ]
      )],
      'branch': [null],
      'password': [null, Validators.compose(
        [
          Validators.required,
          passwordValidator
        ]
      )]
      }, {validator: [phoneNumberFormat('phoneNumber'), passwordFormat('password')]});
  }

  ngOnInit(): void {
    if(this.id) {
      this.form.controls["password"].clearValidators();
      this.form.clearValidators();
      this.form.updateValueAndValidity();

      this.usersService.getUserById(this.id).subscribe(
        (response: any) => {
          this.form.patchValue({
            phoneNumber: response.phoneNumber,
            fullname: response.fullname,
            email: response.email,
            gender: response.gender,
            role: response.role.id,
            branch: response.branch?.id,
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
