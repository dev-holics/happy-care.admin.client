import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SETTING_CONTROL_TYPE } from 'src/app/_config/enum.config';
import { QuestionBaseModel } from '../models/question-base.model';

@Injectable({ providedIn: 'root' })
export class QuestionControlService {
	getValidators(question: QuestionBaseModel<any>) {
		const validators = Array<any>();

		if (question.validates.required) {
			validators.push(Validators.required);
		}

		const { minLength } = question.validates;

		if (minLength) {
			validators.push(Validators.minLength(minLength));
		}

		const { maxLength } = question.validates;

		if (maxLength) {
			validators.push(Validators.maxLength(maxLength));
		}

		const { pattern } = question.validates;

		if (pattern) {
			validators.push(Validators.pattern(pattern));
		}

		return validators;
	}

	getDefaultValue(question: QuestionBaseModel<any>) {
		let defaultValue: any;
		switch (question.controlType) {
			case SETTING_CONTROL_TYPE.DROPDOWN: {
				defaultValue = null;
				break;
			}
			case SETTING_CONTROL_TYPE.CHECKBOX_GROUP: {
				defaultValue = [];
				break;
			}
			default: {
				defaultValue = '';
				break;
			}
		}
		return defaultValue;
	}

	getFormGroup(questions: QuestionBaseModel<any>[]) {
		const group: any = {};
		questions.forEach(question => {
			const validators = this.getValidators(question);
			const defaultValue = this.getDefaultValue(question);
			switch (question.controlType) {
				case SETTING_CONTROL_TYPE.DYNAMIC_TEXT_BOX: {
					group[question.key] = new FormArray(
						[],
						[Validators.required, Validators.maxLength(50)],
					);
					if (!question.value.length) {
						group[question.key].push(
							new FormControl(defaultValue, { validators }),
						);
						break;
					}
					question.value.forEach((value: any) => {
						group[question.key].push(
							new FormControl(value, { validators }),
						);
					});
					break;
				}
				default: {
					group[question.key] = new FormControl(
						question.value || defaultValue,
						{ validators },
					);
					break;
				}
			}
		});
		return new FormGroup(group);
	}

	getValidateMessage(
		formControl: FormControl,
		question: QuestionBaseModel<any>,
		isSubmit: boolean,
	) {
		const messageArr: string[] = [];
		if (!isSubmit) {
			return messageArr;
		}
		if (formControl.invalid) {
			if (formControl.hasError('required')) {
				messageArr.push(`${question.label} không được để trống`);
				return messageArr;
			}
			if (formControl.hasError('minlength')) {
				const minlength = formControl.errors?.minlength.requiredLength;
				messageArr.push(
					`${question.label} phải chứa ít nhất ${minlength} ký tự`,
				);
			}
			if (formControl.hasError('maxlength')) {
				const maxlength = formControl.errors?.maxlength.requiredLength;
				messageArr.push(`${question.label} vượt quá ${maxlength} ký tự`);
			}
			if (formControl.hasError('pattern')) {
				messageArr.push(`${question.label} không hợp lệ`);
			}
		}
		if (
			question.key === 'confirmPassword' &&
			!question.validates.isPasswordMatch
		) {
			messageArr.push(`password_is_not_match`);
		}
		if (question.validates.isDuplicate) {
			messageArr.push(`${question.label}_already_exists`);
		}
		return messageArr;
	}

	getInputValue(
		questions: QuestionBaseModel<any>[],
		formGroup: FormGroup,
		item: any,
		exceptionFields: string[] = [],
	) {
		exceptionFields.push('confirmPassword');
		questions.forEach(question => {
			const formControl = formGroup.get(`${question.key}`);
			if (exceptionFields.includes(question.key)) {
				delete item[`${question.key}`];
				return item;
			}
			if (question.validates?.required) {
				item[`${question.key}`] = formControl?.value || '';
				return item;
			}
			switch (question.controlType) {
				case SETTING_CONTROL_TYPE.TEXT_BOX: {
					item[`${question.key}`] = formControl?.value || '';
					break;
				}
				default: {
					item[`${question.key}`] = formControl?.value || '';
					break;
				}
			}
			return item;
		});
	}

	validatePasswordMatch(
		formGroup: FormGroup,
		questions: QuestionBaseModel<any>[],
	) {
		const settingControl = this.getSettingControl(
			questions,
			'confirmPassword',
		);

		if (settingControl) {
			settingControl.validates.isPasswordMatch =
				this.getFormControl(formGroup, 'password')?.value ===
				this.getFormControl(formGroup, 'confirmPassword')?.value;
		}
	}

	getSettingControl(
		questions: QuestionBaseModel<any>[],
		key: string,
	) {
		return questions.find(element => element.key === key);
	}

	getFormControl(formGroup: FormGroup, key: string) {
		return formGroup.get(key);
	}

	validateScroll(
		questions: QuestionBaseModel<any>[],
		hasValidateScroll: boolean,
	) {
		questions.forEach(question => {
			if (hasValidateScroll) {
				return;
			}
			const element = document.getElementById(
				`${question.key}_validate_message`,
			);
			if (element) {
				element.scrollIntoView({ block: 'center' });
				hasValidateScroll = true;
			}
		});
	}

	checkValidate(
		formGroup: FormGroup,
		questions: QuestionBaseModel<any>[],
	) {
		if (!this.getSettingControl(questions, 'confirmPassword')) {
			return formGroup.valid;
		}
		return (
			formGroup.valid &&
			this.getSettingControl(questions, 'confirmPassword')?.validates
				.isPasswordMatch
		);
	}
}
