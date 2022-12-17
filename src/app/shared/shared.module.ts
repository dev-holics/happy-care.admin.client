import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPrimengModule } from 'src/app/shared/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { BlockUIComponent } from './components/block-ui/block-ui.component';

const PROVIDERS: never[] = [];

const MODULE_SHARED = [
	CustomPrimengModule,
	ReactiveFormsModule,
	PasswordModule,
];

@NgModule({
	declarations: [
		BlockUIComponent,
		DynamicFormQuestionComponent,
		DynamicFormComponent
	],
	imports: [
        ...MODULE_SHARED, 
        CommonModule
    ],
	exports: [
		...MODULE_SHARED,
		BlockUIComponent,
		DynamicFormQuestionComponent,
		DynamicFormComponent
	],
})
export class SharedModule {
	static forRoot(): ModuleWithProviders<SharedModule> {
		return {
			ngModule: SharedModule,
			providers: [...PROVIDERS],
		};
	}
}
