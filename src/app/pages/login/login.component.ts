import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { phoneNumberValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { UserLogin } from 'src/app/_models/user';
import { AccountsService } from 'src/app/_services/accounts.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss',],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  user: UserLogin = {phoneNumber: '', password: '', rememberMe: false}
  public form:FormGroup;
  public settings: Settings;

  loading = false;
  submitted = false;
  returnUrl: string = '';

  constructor(public appSettings:AppSettings,
    public fb: FormBuilder,
    public router:Router,
    public accountsService: AccountsService,
    private alertService: NotificationService){
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'phoneNumber': [null, Validators.compose(
        [
          Validators.required,
          phoneNumberValidator()
        ])],
      'password': [null, Validators.compose(
        [
          Validators.required,
          //Validators.minLength(8),
          //passwordValidator()
        ])],
      'rememberMe': [null]
    });

    const currentUser = this.accountsService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            this.router.navigate(['/'])
        }
  }

  ngOnInit(): void {
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.user.phoneNumber = this.form.value.phoneNumber;
      this.user.password = this.form.value.password;
      this.user.rememberMe = this.form.value.rememberMe;
      this.accountsService.login(this.user).subscribe(
        (response) => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.alertService.showError(error.error.message, 'Đăng nhập thất bại');
          this.loading = false;
        },
      );
    }
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false;
  }
}
