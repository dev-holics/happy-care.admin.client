import { Component } from '@angular/core';
import { QuestionBaseModel } from './shared/models/question-base.model';
import { QuestionControlService } from './shared/services/question-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'happy-care.admin.client';
  public questions: QuestionBaseModel<string>[] = [];

  constructor(private service: QuestionControlService) {
  }

  ngOnInit() {
    this.questions = this.service.getQuestions();
  }
}
