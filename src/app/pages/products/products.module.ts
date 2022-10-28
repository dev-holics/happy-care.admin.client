import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';

export const routes: Routes = [
  { path: '', component: ProductsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ButtonModule
  ],
  declarations: [ProductsComponent],
  providers: [
    DialogService
  ],
})
export class ProductsModule {}
