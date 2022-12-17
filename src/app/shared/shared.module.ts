import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPrimengModule } from 'src/app/shared/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

const PROVIDERS: never[] = [];

const MODULE_SHARED = [
	CustomPrimengModule,
	ReactiveFormsModule,
	PasswordModule,
];

@NgModule({
	declarations: [
	],
	imports: [
        ...MODULE_SHARED, 
        CommonModule
    ],
	exports: [
		...MODULE_SHARED
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
