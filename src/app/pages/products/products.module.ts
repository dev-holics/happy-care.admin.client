import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [CommonModule, ProductsRoutingModule, SharedModule.forRoot()],
  declarations: [ProductsComponent, ProductDialogComponent],
})
export class ProductsModule {}
