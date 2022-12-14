import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';

export const routes = [
  {
      path: '',
      component: ProfileComponent,
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes),
  ],
})
export class ProfileModule { }
