import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { QuestionBaseModel } from 'src/app/shared/models/question-base.model';
import {
  DropdownControl,
  FormArrayControl,
  TextboxControl,
} from 'src/app/shared/models/question-control.model';
import { QuestionControlService } from 'src/app/shared/services/question-control.service';
import { PAYMENT_TYPE } from 'src/app/_config';
import { OrderModel } from '../../models/order.model';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {
  @Input('display') display: boolean;
  @Input('order') order: OrderModel;
  @Output() closeDialogEvent = new EventEmitter<any>();

  public orderInfoQuestions: QuestionBaseModel<string | string[]>[];
  public orderInfoFormGroup: FormGroup;
  public productInfoQuestionArray: QuestionBaseModel<string | string[]>[][] = [];
  public productInfoFormGroupArray: FormGroup[] = [];

  constructor(
    private ordersService: OrdersService,
    private questionControlService: QuestionControlService
  ) {}

  ngOnInit(): void {
    this.orderInfoQuestions = this.initOrderInfoQuestions();
    this.orderInfoFormGroup = this.questionControlService.getFormGroup(
      this.orderInfoQuestions
    );
    this.addProduct();
  }

  get products() {
    return this.orderInfoFormGroup.get("products") as FormArray;
  }

  initOrderInfoQuestions(): QuestionBaseModel<string | string[]>[] {
    const paymentType = [
      { id: PAYMENT_TYPE.CASH, name: 'Bằng tiền mặt' },
      { id: PAYMENT_TYPE.TRANSFER, name: 'Chuyển khoản' },
    ];
    const questions: QuestionBaseModel<string | string[]>[] = [
      new DropdownControl({
        key: 'paymentType',
        label: 'phương thức thanh toán',
        options: paymentType,
        optionLabel: 'name',
        optionValue: 'id',
        validates: {
          required: true
        },
      }),
      new FormArrayControl({
        key: 'products',
        hidden: true
      }),
    ];

    return questions;
  }

  initProductInfoQuestions(): QuestionBaseModel<string | string[]>[] {
    const questions: QuestionBaseModel<string | string[]>[] = [
      new DropdownControl({
        key: 'productId',
        label: 'sản phẩm',
        options: [],
        optionFilter: true,
        optionLabel: 'name',
        optionValue: 'id',
        validates: {
          required: true
        },
      }),
      new TextboxControl({
        key: 'quantity',
        label: 'Số lượng',
        validates: {
          required: true,
          pattern: RegExp('^[0-9]*$'),
        },
      }),
    ];

    return questions;
  }

  addProduct() {
    const productInfoQuestions = this.initProductInfoQuestions();
    const productInfoFormGroup = this.questionControlService.getFormGroup(
      productInfoQuestions
    );
    this.productInfoQuestionArray.push(productInfoQuestions);
    this.productInfoFormGroupArray.push(productInfoFormGroup);
    this.products.push(productInfoFormGroup);
  }

  removeProduct(index: number) {
    this.productInfoQuestionArray.splice(index, 1);
    this.productInfoFormGroupArray.splice(index, 1);
    this.products.removeAt(index);
  }

  public get isVisible(): boolean {
    return this.display;
  }
  
  public set isVisible(val: boolean) {
    this.close(null);
  }
  
  close(order) {
    this.orderInfoFormGroup.reset();
    if (!order) {
      this.closeDialogEvent.emit(null);
      return;
    }
    this.closeDialogEvent.emit(order);
  }

  onSubmit() {
    console.log(this.orderInfoFormGroup.getRawValue());
  }
}
