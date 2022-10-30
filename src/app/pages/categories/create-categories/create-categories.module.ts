import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateCategoriesComponent } from './create-categories.component';

export const routes = [
  {
      path: '',
      component: CreateCategoriesComponent,
  }
];

@NgModule({
  declarations: [
    CreateCategoriesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
})
export class CreateCategoriesModule { }
