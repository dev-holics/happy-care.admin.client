import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomPrimengModule } from 'src/app/shared/primeng.module';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { BlockUIComponent } from './components/block-ui/block-ui.component';
import { CustomMaterialModule } from './material.module';
import { SidenavComponent } from '../theme/components/sidenav/sidenav.component';
import { UserMenuComponent } from '../theme/components/user-menu/user-menu.component';
import { VerticalMenuComponent } from '../theme/components/menu/vertical-menu/vertical-menu.component';

const PROVIDERS: never[] = [];

const MODULE_SHARED = [
	CustomMaterialModule,
	CustomPrimengModule,
	ReactiveFormsModule,
	PasswordModule,
];

@NgModule({
	declarations: [
		BlockUIComponent,
    	DynamicFormQuestionComponent,
		DynamicFormComponent,
		SidenavComponent,
		UserMenuComponent,
		VerticalMenuComponent
	],
	imports: [
		...MODULE_SHARED, 
		CommonModule, 
		FlexLayoutModule
	],
	exports: [
		...MODULE_SHARED,
		BlockUIComponent,
    	DynamicFormQuestionComponent,
		DynamicFormComponent,
		SidenavComponent,
		UserMenuComponent,
		VerticalMenuComponent
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
