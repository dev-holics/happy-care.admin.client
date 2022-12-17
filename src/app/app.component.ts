import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscriber } from 'rxjs';
import { UiHelper } from './_helpers/ui.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'happy-care.admin.client';
  
  subscribe = new Subscriber();
  public isAppLoading: boolean;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
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
