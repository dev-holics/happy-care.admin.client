import { Component, Input, OnInit } from '@angular/core';
import { BrandModel } from 'src/app/pages/brands/models/brand.model';
import { OriginModel } from 'src/app/pages/origins/models/origin.model';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { QuestionBaseModel } from 'src/app/shared/models/question-base.model';
import { DropdownControl, TextareaControl, TextboxControl } from 'src/app/shared/models/question-control.model';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './../../../../shared/components/base-dialog/base-dialog.component.html',
  styleUrls: ['./../../../../shared/components/base-dialog/base-dialog.component.scss'],
})
export class ProductDialogComponent extends BaseDialogComponent implements OnInit {
  @Input('brands') brands: BrandModel[];
  @Input('origins') origins: OriginModel[];
  @Input('product') product: ProductModel;

  override ngOnInit(): void {
    super.ngOnInit();
    this.title = "sản phẩm",
    this.style = {
      width: '50vw'
    }
  }

  override createFormQuestions(): void {
    const questions: QuestionBaseModel<string | string[]>[] = [
			new TextboxControl({
				key: 'code',
				label: 'Mã sản phẩm',
				value: this.model.code || '',
				validates: {
					required: true,
					maxLength: 500,
				},
			}),
      new TextboxControl({
				key: 'name',
				label: 'Tên sản phẩm',
				value: this.model.name || '',
				validates: {
					required: true
				},
			}),
      new TextareaControl({
				key: 'description',
				label: 'Mô tả',
				value: this.model.description || ''
			}),
      new TextboxControl({
        key: 'packingSpec',
        label: 'Quy cách đóng gói',
        value: this.model.packingSpec || ''
      }),
      new TextboxControl({
        key: 'unit',
        label: 'Đơn vị tính',
        value: this.model.unit || '',
        validates: {
          required: true
        },
      }),
      new TextboxControl({
        key: 'price',
        label: 'Giá',
        value: this.model.price? this.model.price.toString() : null || '',
        validates: {
          required: true
        },
      }),
      new TextareaControl({
        key: 'element',
        label: 'Thành phần',
        value: this.model.element || '',
        validates: {
        },
      }),
      new TextareaControl({
        key: 'uses',
        label: 'Công dụng',
        value: this.model.uses || '',
        validates: {
          required: true
        },
      }),
      new TextareaControl({
        key: 'subject',
        label: 'Đối tượng sử dụng',
        value: this.model.subject || '',
        validates: {
          required: true
        },
      }),
      new TextareaControl({
        key: 'guide',
        label: 'Hướng dẫn sử dụng',
        value: this.model.guide || '',
        validates: {
          required: true
        }
      }),
      new TextareaControl({
        key: 'preserve',
        label: 'Hướng dẫn bảo quản',
        value: this.model.preserve || '',
        validates: {
          required: true
        }
      }),
      new DropdownControl({
        key: 'trademarkId',
				label: 'Thương hiệu',
				value: this.model.trademarkId || '',
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
				value: this.model.originId || '',
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
				value: this.model.categoryId || '',
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
}
