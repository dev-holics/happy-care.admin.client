import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesComponent } from './categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const routes = [
  {
      path: '',
      component: CategoriesComponent,
  }
];

@NgModule({
  declarations: [
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
})
export class CategoriesModule { }
