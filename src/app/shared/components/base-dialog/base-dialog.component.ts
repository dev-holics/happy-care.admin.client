import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBaseModel } from '../../models/question-base.model';
import { QuestionControlService } from '../../services/question-control.service';

@Component({
  selector: 'app-base-dialog',
  template: '<p>Base Dialog</p>',
  styleUrls: [],
})
export class BaseDialogComponent implements OnInit {
  @Input('display') display: boolean;
  @Input('model') model: any;
  @Output() closeDialog = new EventEmitter<any>();

  public title: string = '';
  public questions: QuestionBaseModel<string | string[]>[];
  public form: FormGroup;
  public style: any = {};

  constructor(
    protected questionControlService: QuestionControlService
  ) {}

  ngOnInit(): void {
    this.createFormQuestions();
    this.createForm();
  }

  createFormQuestions(): void {
    this.questions = [];
  }

  createForm() {
    this.form = this.questionControlService.getFormGroup(this.questions);
  }

  public get isVisible(): boolean {
    return this.display;
  }
  
  public set isVisible(val: boolean) {
    this.close(null);
  }

  close(model: any): void {
    if(model) {
      this.closeDialog.emit(model);
    } else {
      this.closeDialog.emit(null);
    }
  }
}
