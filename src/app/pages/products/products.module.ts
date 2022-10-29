import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

export const routes: Routes = [
  { path: '', component: ProductsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule
  ],
  declarations: [
    ProductDialogComponent,
    ProductsComponent
  ],
  providers: [
    DialogService
  ],
})
export class ProductsModule {}
