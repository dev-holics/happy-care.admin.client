import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  dialogRef: DynamicDialogRef;

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {}

  public addProduct(product: Product) {
    console.log(product);
  }
  public updateProduct(product: Product) {
    console.log(product);
  }

  public openUserDialog(product) {
    this.dialogRef = this.dialogService.open(ProductDialogComponent, {
      data: product,
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.dialogRef.onClose.subscribe((product) => {
      if (product) {
        product.id ? this.updateProduct(product) : this.updateProduct(product);
      }
    });
  }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
