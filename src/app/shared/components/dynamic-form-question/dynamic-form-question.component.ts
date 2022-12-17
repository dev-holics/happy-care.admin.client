import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { QuestionBaseModel } from '../../models/question-base.model';
import { QuestionControlService } from '../../services/question-control.service';

@Component({
	selector: 'dynamic-form-question',
	templateUrl: './dynamic-form-question.component.html',
	styleUrls: ['./dynamic-form-question.component.scss'],
})
export class DynamicFormQuestionComponent implements OnInit, OnDestroy {
	subscription: Subscription = new Subscription();
	questionControlService = new QuestionControlService();

	constructor(private renderer: Renderer2) {}

	@Input() question!: QuestionBaseModel<any>;
	@Input() questions!: QuestionBaseModel<any>[];
	@Input() formGroup!: FormGroup;
	@Input() isSubmit!: boolean;

	ngOnInit() {}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	handleEnterEventOfDynamicTextBox(
		dynamicTextBoxIndex: number,
		dynamicTextBoxLength: number,
		formArray: FormArray,
		question: QuestionBaseModel<any>,
	) {
		if (dynamicTextBoxIndex + 1 === dynamicTextBoxLength) {
			this.addDynamicTextBox(formArray, question);
		}
		const elementId = `#${question.key}_${dynamicTextBoxIndex + 1}`;

		this.subscription.add(
			timer(0).subscribe(_ => {
				this.renderer.selectRootElement(elementId).focus();
			}),
		);
	}

	addDynamicTextBox(
		formArray: FormArray,
		question: QuestionBaseModel<any>,
	) {
		const validators =
			this.questionControlService.getValidators(question);
		formArray.push(new FormControl('', { validators }));
	}

	removeDynamicTextBox(formArray: FormArray, i: number) {
		formArray.removeAt(i);
	}

	getControls(controlName: any) {
		return (this.formGroup.get(controlName) as FormArray).controls;
	}

	trackByFn(index: any) {
		return index;
	}
}
