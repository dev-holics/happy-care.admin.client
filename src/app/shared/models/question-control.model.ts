import { QUESTION_CONTROL_TYPE } from 'src/app/_config';
import { QuestionBaseModel } from './question-base.model';

export class TextboxControl extends QuestionBaseModel<string> {
  override controlType = QUESTION_CONTROL_TYPE.TEXT_BOX;
}

export class TextareaControl extends QuestionBaseModel<string> {
  override controlType = QUESTION_CONTROL_TYPE.TEXT_AREA;
}

export class DynamicTextBoxControl extends QuestionBaseModel<string[]> {
  override controlType = QUESTION_CONTROL_TYPE.DYNAMIC_TEXT_BOX;
}

export class DropdownControl extends QuestionBaseModel<string> {
  override controlType = QUESTION_CONTROL_TYPE.DROPDOWN;
}

export class CheckboxGroupControl extends QuestionBaseModel<string[]> {
  override controlType = QUESTION_CONTROL_TYPE.CHECKBOX_GROUP;
}

export class PasswordControl extends QuestionBaseModel<string> {
  override controlType = QUESTION_CONTROL_TYPE.PASSWORD;
}

export class CheckboxControl extends QuestionBaseModel<boolean> {
  override controlType = QUESTION_CONTROL_TYPE.CHECKBOX;
}

export class RadioButtonGroupControl extends QuestionBaseModel<string> {
  override controlType = QUESTION_CONTROL_TYPE.RADIO_BUTTON_GROUP;
}

export class FormArrayControl extends QuestionBaseModel<any[]> {
  override controlType = QUESTION_CONTROL_TYPE.FORM_ARRAY;
}
