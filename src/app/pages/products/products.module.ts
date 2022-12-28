import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ProductExportDialogComponent } from './components/product-export-dialog/product-export-dialog.component';
import { ProductImportDialogComponent } from './components/product-import-dialog/product-import-dialog.component';
import { ProductLogComponent } from './components/product-log/product-log.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [CommonModule, ProductsRoutingModule, SharedModule.forRoot()],
  declarations: [
    ProductsComponent, 
    ProductDialogComponent,
    ProductLogComponent,
    ProductImportDialogComponent,
    ProductExportDialogComponent
  ],
})
export class ProductsModule {}
