import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/_models/profile';
import { AccountsService } from 'src/app/_services/accounts.service';
import { NotificationService } from 'src/app/_services/notification.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  profile: Profile = new Profile();
  loading = false;
  submitted = false;
  inputChanged = false;
  public form: FormGroup;
  constructor(
    public accountService: AccountsService,
    public alertService: NotificationService,
    public fb: FormBuilder,
    ) {
      this.form = this.fb.group({
        'phoneNumber': [this.profile.phoneNumber, Validators.compose(
          [
          ])],
        'email': [null, Validators.compose(
          [
            Validators.email,
          ])],
        'fullname': [null, Validators.compose(
          [
            Validators.required
          ])],
        'gender': [null, Validators.compose(
          [
            Validators.required
          ])],
        'birthday': [null],
        'avatar': [null]
        });
    }

  ngOnInit(): void {
    this.fetchProfile();
    this.form.valueChanges.subscribe((currentValue) => {
      if (!_.isEqual(_.omit(currentValue, 'avatar'), _.omit(this.profile, ['id', 'role', 'isActive']))) {
        this.inputChanged = true;
      } else {
        this.inputChanged = false;
      }
    });
  }
  fetchProfile() {
    this.accountService.getProfile().subscribe(
      (response: any) => {
        this.profile = response.data;
      },
      (error) => {console.error(error);},
    )
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    this.loading = true;
    if (this.form.valid) {
      this.profile.phoneNumber = this.form.value.phoneNumber;
      this.profile.email = this.form.value.email;
      this.profile.fullname = this.form.value.fullname;
      this.profile.birthday = this.form.value.birthday;
      this.profile.gender = this.form.value.gender;
      this.accountService.updateProfile(this.profile).subscribe(
        (response) => {
          this.loading = false;
          this.alertService.showSuccess(response.message, "");
        },
        (error) => {
          this.alertService.showError(error.error.errors[0].message, "");
          this.loading = false;
        },
      );}
  }
}
