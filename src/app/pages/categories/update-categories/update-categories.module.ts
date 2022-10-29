import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCategoriesComponent } from './update-categories.component';

export const routes = [
  {
      path: '',
      component: UpdateCategoriesComponent,
  }
];

@NgModule({
  declarations: [
    UpdateCategoriesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
})
export class UpdateCategoriesModule { }
