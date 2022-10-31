import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OriginsComponent } from './origins.component';
import { OriginDialogComponent } from './origin-dialog/origin-dialog.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', component: OriginsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  declarations: [
    OriginDialogComponent,
    OriginsComponent
  ],
  providers: [
  ],
})
export class OriginsModule {}
