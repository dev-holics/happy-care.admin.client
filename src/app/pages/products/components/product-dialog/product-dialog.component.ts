import { Component, Input, OnInit } from '@angular/core';
import { BrandModel } from 'src/app/pages/brands/models/brand.model';
import { BrandsService } from 'src/app/pages/brands/services/brands.service';
import { CategoriesService } from 'src/app/pages/categories/services/categories.service';
import { OriginModel } from 'src/app/pages/origins/models/origin.model';
import { OriginsService } from 'src/app/pages/origins/services/origins.service';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { DEFAULT_PAGINATION, SCROLL_DEFAULT_CONFIG } from 'src/app/shared/config';
import { QuestionBaseModel } from 'src/app/shared/models/question-base.model';
import { DropdownControl, TextareaControl, TextboxControl } from 'src/app/shared/models/question-control.model';
import { CategoryModel } from 'src/app/_models/category';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './../../../../shared/components/base-dialog/base-dialog.component.html',
  styleUrls: ['./../../../../shared/components/base-dialog/base-dialog.component.scss'],
})
export class ProductDialogComponent extends BaseDialogComponent implements OnInit {
  @Input('product') product: ProductModel;

  public lastBrandPage: number = 1;
  public lastCategoryPage: number = 1;
  public lastOriginPage: number = 1;

  public brands: BrandModel[] = [];
  public categories: CategoryModel[] = [];
  public origins: OriginModel[] = [];

  constructor(
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    private originsService: OriginsService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.getBrands();
    this.getCategories();
    this.getOrigins();
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
        virtualScroll: true,
        virtualScrollItemSize: DEFAULT_PAGINATION.LIMIT * 2,
        virtualScrollOptions: {
          showLoader: true,
          loading: false
        },
        lazy: true,
        onLazyLoad: this.onBrandLazyLoad.bind(this),
				validates: {
					required: true,
				}
      }),
      new DropdownControl({
        key: 'originId',
				label: 'Nguồn gốc',
				value: this.model.originId || '',
				options: this.origins,
				optionLabel: 'name',
				optionValue: 'id',
        virtualScroll: true,
        virtualScrollItemSize: DEFAULT_PAGINATION.LIMIT * 2,
        virtualScrollOptions: {
          showLoader: true,
          loading: false
        },
        lazy: true,
        onLazyLoad: this.onOriginLazyLoad.bind(this),
				validates: {
					required: true,
				},
      }),
      new DropdownControl({
        key: 'categoryId',
				label: 'Loại sản phẩm',
				value: this.model.categoryId || '',
				options: this.categories,
				optionLabel: 'name',
				optionValue: 'id',
        virtualScroll: true,
        virtualScrollItemSize: DEFAULT_PAGINATION.LIMIT * 2,
        virtualScrollOptions: {
          showLoader: true,
          loading: false
        },
        lazy: true,
        onLazyLoad: this.onCategoryLazyLoad.bind(this),
				validates: {
					required: true,
				},
      })
    ];
    this.questions = questions;
  }

  async getBrands(): Promise<void> {
    const query = {
      page: DEFAULT_PAGINATION.PAGE,
      limit: DEFAULT_PAGINATION.LIMIT
    }
    const res = await this.brandsService.getBrands(query);
    this.brands = Array.from({length: res.paginator.totalData});
    if (!res.data.find(x => x.id === this.model.trademarkId)) {
      this.brands[res.paginator.totalData - 1] = this.model.trademark;
    }
    for (let i = 0; i < res.data.length; i++) {
      this.brands[i] = res.data[i];
    }
    this.questions[11].options = this.brands;
  }

  async getCategories(): Promise<void> {
    const query = {
      page: DEFAULT_PAGINATION.PAGE,
      limit: DEFAULT_PAGINATION.LIMIT
    }
    const res = await this.categoriesService.getCategories(query);
    this.categories = Array.from({length: res.paginator.totalData});
    if (!res.data.find(x => x.id === this.model.categoryId)) {
      this.categories[res.paginator.totalData - 1] = this.model.category;
    }
    for (let i = 0; i < res.data.length; i++) {
      this.categories[i] = res.data[i];
    }
    this.questions[13].options = this.categories;
  }

  async getOrigins(): Promise<void> {
    const query = {
      page: DEFAULT_PAGINATION.PAGE,
      limit: DEFAULT_PAGINATION.LIMIT
    }
    const res = await this.originsService.getOrigins(query);
    this.origins = Array.from({length: res.paginator.totalData});
    if (!res.data.find(x => x.id === this.model.originId)) {
      this.origins[res.paginator.totalData - 1] = this.model.origin;
    }
    for (let i = 0; i < res.data.length; i++) {
      this.origins[i] = res.data[i];
    }
    this.questions[12].options = this.origins;
  }

  async onBrandLazyLoad(event): Promise<void> {
    const { first, last } = event;
    const page = Math.floor(last / DEFAULT_PAGINATION.LIMIT) + 1;
    if (page > this.lastBrandPage) {
      this.questions[11].virtualScrollOptions = {
        showLoader: true,
        loading: true,
        delay: SCROLL_DEFAULT_CONFIG.DELAY
      }
      const query = {
        page: page,
        limit: DEFAULT_PAGINATION.LIMIT
      }
      const res = await this.brandsService.getBrands(query, false);
      const firstIndex = this.lastBrandPage * DEFAULT_PAGINATION.LIMIT;
      const lastIndex = firstIndex + res.data.length;
      this.brands.splice(firstIndex, lastIndex, ...res.data);
      this.lastBrandPage = res.paginator.page;
      this.questions[11].virtualScrollOptions = {
        showLoader: true,
        loading: false,
        delay: 0
      }
    }
  }

  async onCategoryLazyLoad(event): Promise<void> {
    const { first, last } = event;
    const page = Math.floor(last / DEFAULT_PAGINATION.LIMIT) + 1;
    if (page > this.lastCategoryPage) {
      this.questions[13].virtualScrollOptions = {
        showLoader: true,
        loading: true,
        delay: SCROLL_DEFAULT_CONFIG.DELAY
      }
      const query = {
        page: page,
        limit: DEFAULT_PAGINATION.LIMIT
      }
      const res = await this.categoriesService.getCategories(query, false);
      const firstIndex = this.lastCategoryPage * DEFAULT_PAGINATION.LIMIT;
      const lastIndex = firstIndex + res.data.length;
      this.categories.splice(firstIndex, lastIndex, ...res.data);
      this.lastCategoryPage = res.paginator.page;
      this.questions[13].virtualScrollOptions = {
        showLoader: true,
        loading: false,
        delay: 0
      }
    }
  }

  async onOriginLazyLoad(event): Promise<void> {
    const { first, last } = event;
    const page = Math.floor(last / DEFAULT_PAGINATION.LIMIT) + 1;
    if (page > this.lastOriginPage) {
      this.questions[12].virtualScrollOptions = {
        showLoader: true,
        loading: true,
        delay: SCROLL_DEFAULT_CONFIG.DELAY
      }
      const query = {
        page: page,
        limit: DEFAULT_PAGINATION.LIMIT
      }
      const res = await this.originsService.getOrigins(query, false);
      const firstIndex = this.lastOriginPage * DEFAULT_PAGINATION.LIMIT;
      const lastIndex = firstIndex + res.data.length;
      this.origins.splice(firstIndex, lastIndex, ...res.data);
      this.lastOriginPage = res.paginator.page;
      this.questions[12].virtualScrollOptions = {
        showLoader: true,
        loading: false,
        delay: 0
      }
    }
  }

}
