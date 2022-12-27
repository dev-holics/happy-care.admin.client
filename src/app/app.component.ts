import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { QuestionBaseModel } from './shared/models/question-base.model';
import { QuestionControlService } from './shared/services/question-control.service';
import { UiHelper } from './shared/helpers/ui.helper';
import { AccountsService } from './_services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'happy-care-admin';
  
  subscribe = new Subscriber();
  public isAppLoading: boolean;
  public settings: Settings;
  questions: QuestionBaseModel<any>[];
  cities: any[];

  constructor(
    public appSettings:AppSettings, 
    public accountsService: AccountsService,
    private cd: ChangeDetectorRef
  ){
      this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.accountsService.refreshToken();
  }

  ngOnDestroy() {
		this.subscribe.unsubscribe();
	}

	ngAfterContentChecked() {
		this.subscribeBlockUi();
    this.cd.detectChanges();
	}

  subscribeBlockUi() {
		this.subscribe.add(
			UiHelper.subscribeBlockUI(isBlock => {
				this.isAppLoading = isBlock;
			}),
		);
	}
}
