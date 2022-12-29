import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/pages/products/models/product.model';
import { PAYMENT_TYPE } from 'src/app/shared/config';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {
  @Input('display') display: boolean;
  @Input('products') products: ProductModel[];
  @Input('order') order: OrderModel;
  @Output() closeDialogEvent = new EventEmitter<any>();

  public paymentTypes: any[] = [];
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.paymentTypes = [
      { id: PAYMENT_TYPE.CASH, name: 'Bằng tiền mặt' },
      { id: PAYMENT_TYPE.TRANSFER, name: 'Chuyển khoản' },
    ];
    this.form = this.fb.group(
      {
        productId: null,
        customerId: null,
        products: this.fb.array([this.productForm()]),
        paymentType: [null, Validators.compose([Validators.required])],
        totalPrice: null,
      }
    );
  }

  get productFormArray(){
    return this.form.get("products") as FormArray;
  }

  public get isVisible(): boolean {
    return this.display;
  }

  public set isVisible(val: boolean) {
    this.close(null);
  }

  addProductForm(){
    this.productFormArray.push(this.productForm());
  }

  removeProductForm(i: Required<number>){
    this.productFormArray.removeAt(i);
  }

  productForm() {
    return this.fb.group({
      productId: [null, Validators.compose([Validators.required])],
      price: null,
      quantity: [null, Validators.compose([Validators.required])],
    });
  }

  onProductChange(event, i: Required<number>) {
    const product = this.products.find((p) => p.id === event.value);
    const priceField = this.productFormArray.controls[i].get('price');
    if (!product) {
      priceField?.setValue(null);
      return;
    }
    priceField?.setValue(product.price);
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    let totalPrice = 0;
    this.productFormArray.controls.forEach((product) => {
      const price = product.get('price')?.value;
      const quantity = product.get('quantity')?.value;
      if (!price || !quantity) {
        return;
      }
      totalPrice += price * quantity;
    });
    this.form.get('totalPrice')?.setValue(totalPrice);
  }

  close(order) {
    if (!order) {
      this.closeDialogEvent.emit(null);
      return;
    }
    this.closeDialogEvent.emit(order);
  }

  onSubmit() {
  }

}
