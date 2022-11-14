import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OriginModel } from 'src/app/pages/origins/models/origin.model';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  providers: [FormBuilder]
})
export class ProductDialogComponent implements OnInit {
  @Input('display') display: boolean;
  @Input('origins') origins: OriginModel[];
  @Input('product') product: ProductModel;
  @Output() closeDialog = new EventEmitter<any>();

  public form: FormGroup;

  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({
      id: null,
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      description: null,
      packingSpec: [null, Validators.compose([Validators.required])],
      unit: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      element: [null, Validators.compose([Validators.required])],
      discount: null,
      uses: null,
      subject: null,
      guide: null,
      preserve: null,
      trademarkId: [null, Validators.compose([Validators.required])],
      originId: [null, Validators.compose([Validators.required])],
      categoryId: [null, Validators.compose([Validators.required])],
      images: null,
    });
  }

  ngOnInit(): void {
    if(this.product) {
      this.form.patchValue(this.product);
    } else {
      this.product = new ProductModel();
    }
  }

  public get isVisible(): boolean {
    return this.display;
  }
  
  public set isVisible(val: boolean) {
    console.log("Bien");
    this.close(null);
  }

  close(product): void {
    if(product) {
      this.closeDialog.emit(product);
    } else {
      this.closeDialog.emit(null);
    }
    this.form.reset();
  }
}
