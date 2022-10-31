import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  providers: [FormBuilder]
})
export class ProductDialogComponent implements OnInit {
  public form: FormGroup;
  public product: Product;

  constructor(public dialogRef: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public fb: FormBuilder) {
    this.product = config.data;
    if(this.product) {
      config.header = 'Edit Product';
    } else {
      config.header = 'Add Product';
    }
    this.form = this.fb.group({
      id: null,
      code: null,
      name: null,
      description: null,
      packingSpec: null,
      price: null,
      trademarkId: null,
      originId: null,
      categoryId: null,
      images: null,
    });
  }

  ngOnInit(): void {
    if(this.product) {
      this.form.patchValue(this.product);
    } else {
      this.product = new Product();
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
