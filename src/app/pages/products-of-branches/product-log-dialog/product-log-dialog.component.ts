import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Branch } from 'src/app/_models/branch';
import { ProductLogService } from 'src/app/_services/product-log.service';
import { ProductModel } from '../../products/models/product.model';

@Component({
  selector: 'app-product-log-dialog',
  templateUrl: './product-log-dialog.component.html',
  styleUrls: ['./product-log-dialog.component.scss']
})
export class ProductLogDialogComponent implements OnInit {
  @Input('display') display: boolean;
  @Input('branches') branches: Branch[];
  @Input('products') products: ProductModel[];
  @Input('productId') productId: string = '';
  @Input('branchId') branchId: string = '';

  @Output() closeDialog = new EventEmitter<any>();
  public form: FormGroup;
  submitted = false;
  constructor(public fb: FormBuilder, public productLogService: ProductLogService) {
    this.form = this.fb.group({
      'productId': [null, Validators.compose(
        [
          Validators.required,
        ])],
      'branchId': [null, Validators.compose(
        [
          Validators.required,
        ]
      )],
      'transactionDate': [null, Validators.compose(
        [
          Validators.required
        ]
      )],
      'quantity': [null, Validators.compose(
        [
          Validators.required
        ]
      )],
      'type': ["IMPORT"],
      });
  }

  ngOnInit(): void {
    this.form.patchValue({
      type: "IMPORT",
      productId: this.productId,
      branchId: this.branchId,
    })
  }

  public get isVisible(): boolean {
    return this.display;
  }

  public set isVisible(val: boolean) {
    this.close(null);
  }

  close(productLog: any): void {
    if(productLog) {
      this.closeDialog.emit(productLog);
    } else {
      this.closeDialog.emit(null);
    }
    this.form.reset();
  }
}
