import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { phoneNumberValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public form:FormGroup;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public fb: FormBuilder, public router:Router){
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'phoneNumber': [null, Validators.compose([Validators.required, phoneNumberValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false;
  }
}
