import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandModel } from 'src/app/pages/brands/models/brand.model';
import { OriginModel } from 'src/app/pages/origins/models/origin.model';
import { QuestionBaseModel } from 'src/app/shared/models/question-base.model';
import { DropdownControl, TextareaControl, TextboxControl } from 'src/app/shared/models/question-control.model';
import { QuestionControlService } from 'src/app/shared/services/question-control.service';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  providers: [FormBuilder]
})
export class ProductDialogComponent implements OnInit {
  @Input('display') display: boolean;
  @Input('brands') brands: BrandModel[];
  @Input('origins') origins: OriginModel[];
  @Input('product') product: ProductModel;
  @Output() closeDialog = new EventEmitter<any>();

  public questions: QuestionBaseModel<string | string[]>[];
  public form: FormGroup;

  constructor(
    private questionControlService: QuestionControlService
  ) {}

  ngOnInit(): void {
    this.createFormQuestions();
    this.createForm();
  }

  createFormQuestions(): void {
    const questions: QuestionBaseModel<string | string[]>[] = [
			new TextboxControl({
				key: 'code',
				label: 'Mã sản phẩm',
				value: this.product.code || '',
				validates: {
					required: true,
					maxLength: 500,
				},
			}),
      new TextboxControl({
				key: 'name',
				label: 'Tên sản phẩm',
				value: this.product.name || '',
				validates: {
					required: true
				},
			}),
      new TextareaControl({
				key: 'description',
				label: 'Mô tả',
				value: this.product.description || ''
			}),
      new TextboxControl({
        key: 'packingSpec',
        label: 'Quy cách đóng gói',
        value: this.product.packingSpec || ''
      }),
      new TextboxControl({
        key: 'unit',
        label: 'Đơn vị tính',
        value: this.product.unit || '',
        validates: {
          required: true
        },
      }),
      new TextboxControl({
        key: 'price',
        label: 'Giá',
        value: this.product.price? this.product.price.toString() : null || '',
        validates: {
          required: true
        },
      }),
      new TextareaControl({
        key: 'element',
        label: 'Thành phần',
        value: this.product.element || '',
        validates: {
        },
      }),
      new TextareaControl({
        key: 'uses',
        label: 'Công dụng',
        value: this.product.uses || '',
        validates: {
          required: true
        },
      }),
      new TextareaControl({
        key: 'subject',
        label: 'Đối tượng sử dụng',
        value: this.product.subject || '',
        validates: {
          required: true
        },
      }),
      new TextareaControl({
        key: 'guide',
        label: 'Hướng dẫn sử dụng',
        value: this.product.guide || '',
        validates: {
          required: true
        }
      }),
      new TextareaControl({
        key: 'preserve',
        label: 'Hướng dẫn bảo quản',
        value: this.product.preserve || '',
        validates: {
          required: true
        }
      }),
      new DropdownControl({
        key: 'trademarkId',
				label: 'Thương hiệu',
				value: this.product.trademarkId || '',
				options: this.brands,
				optionLabel: 'name',
				optionValue: 'id',
				validates: {
					required: true,
				},
      }),
      new DropdownControl({
        key: 'originId',
				label: 'Nguồn gốc',
				value: this.product.originId || '',
				options: this.origins,
				optionLabel: 'name',
				optionValue: 'id',
				validates: {
					required: true,
				},
      }),
      new DropdownControl({
        key: 'categoryId',
				label: 'Loại sản phẩm',
				value: this.product.categoryId || '',
				options: this.brands,
				optionLabel: 'name',
				optionValue: 'id',
				validates: {
					required: true,
				},
      })
    ];
    this.questions = questions;
  }

  createForm() {
    this.form = this.questionControlService.getFormGroup(this.questions);
  }

  public get isVisible(): boolean {
    return this.display;
  }
  
  public set isVisible(val: boolean) {
    this.close(null);
  }

  close(product): void {
    if(product) {
      this.closeDialog.emit(product);
    } else {
      this.closeDialog.emit(null);
    }
  }
}
