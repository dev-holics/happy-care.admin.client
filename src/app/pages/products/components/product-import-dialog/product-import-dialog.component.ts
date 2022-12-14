import { Component, Input, OnInit } from '@angular/core';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { QuestionBaseModel } from 'src/app/shared/models/question-base.model';
import { DropdownControl, TextboxControl } from 'src/app/shared/models/question-control.model';
import { BranchModel } from 'src/app/pages/branches/models/branch.model';
import { ProductModel } from '../../models/product.model';
import { Profile } from 'src/app/_models/profile';
import { ROLE } from 'src/app/shared/config';

@Component({
  selector: 'app-product-import-dialog',
  templateUrl: './../../../../shared/components/base-dialog/base-dialog.component.html',
  styleUrls: ['./../../../../shared/components/base-dialog/base-dialog.component.scss']
})
export class ProductImportDialogComponent extends BaseDialogComponent implements OnInit {
  @Input('branches') branches: BranchModel[];
  @Input('products') products: ProductModel[];
  @Input('profile') profile: Profile;

  override ngOnInit(): void {
    super.ngOnInit();
    this.title = "phiếu nhập sản phẩm";
    this.style = {
      width: '30vw'
    }
  }

  override createFormQuestions(): void {
    const questions: QuestionBaseModel<string | string[]>[] = [
      new DropdownControl({
        key: 'productId',
        label: 'Sản phẩm',
        value: '',
        options: this.products,
        optionLabel: 'name',
        optionValue: 'id',
        validates: {
          required: true,
        },
      }),
      new DropdownControl({
        key: 'branchId',
        label: 'Chi nhánh',
        value: this.profile?.branchId || '',
        hidden: this.profile?.role === ROLE.PHARMACIST ? true : false,
        options: this.branches,
        optionLabel: 'address',
        optionValue: 'id',
        validates: {
          required: true,
        },
      }),
      new TextboxControl({
        key: 'quantity',
        label: 'Số lượng',
        value: '',
        validates: {
          required: true,
        },
      }),
      new TextboxControl({
        key: 'expired',
        label: 'Hạn sử dụng',
        value: '',
        type: 'date',
        validates: {
          required: true,
        },
      }),
    ];
    this.questions = questions;
  }
}
