import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchingPasswords, passwordValidator } from 'src/app/shared/utils/app-validators';
import { UserChangePassword } from 'src/app/_models/user';
import { AccountsService } from 'src/app/_services/accounts.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  userChangePassword: UserChangePassword = new UserChangePassword();
  loading = false;
  submitted = false;
  form: FormGroup;
  constructor(public accountService: AccountsService,
    public alertService: NotificationService,
    public fb: FormBuilder,
    ) {
      this.form = this.fb.group({
        'oldPassword': [null, Validators.compose(
          [
            Validators.required
          ])],
        'newPassword': [null, Validators.compose(
          [
            Validators.required,
            passwordValidator(),
          ])],
        'confirmPassword': [null, Validators.compose(
          [
            Validators.required,
          ])],
        }, {validator: matchingPasswords('newPassword', 'confirmPassword')});
    }

  ngOnInit(): void {
  }
  public onSubmit(values:Object): void {
    this.submitted = true;
    //Apply Service
  }
}
