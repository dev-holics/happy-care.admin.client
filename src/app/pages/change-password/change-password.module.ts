import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ChangePasswordComponent } from './change-password.component';

export const routes = [
  {
      path: '',
      component: ChangePasswordComponent,
  }
];

@NgModule({
  declarations: [
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes),
  ],
})
export class ChangePasswordModule { }
