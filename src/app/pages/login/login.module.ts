import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { AlertComponent } from 'src/app/_components/alerts/alert.component';
export const routes = [
  { path: '', component: LoginComponent, }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    AlertComponent
  ]
})
export class LoginModule { }
