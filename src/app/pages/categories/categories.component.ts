import { Component, OnInit } from '@angular/core';
import { ResolveEnd } from '@angular/router';
import * as _ from 'lodash';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { CategoryModel, CategoryCreateUpdate, CategoryOptions } from 'src/app/_models/category';
import decode from "jwt-decode";
import { AccountsService } from 'src/app/_services/accounts.service';
import { CategoriesService } from 'src/app/_services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: CategoryModel[] = []
  public categoryOptions: CategoryOptions[] = []
  public displayDialog: boolean;
  public selectedId: string;
  public canUpdate: boolean = true;
  public canAdd: boolean = true;
  public canDelete: boolean = true;
  public paginator: any = {
    page: 1,
    limit: 10,
    totalData: 0,
  };
  constructor(
    public categoryService: CategoriesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private accountsService: AccountsService) { }

  async ngOnInit(): Promise<void> {
    await this.fetchCategories();
    const currentUser = this.accountsService.currentUserValue;
    if (currentUser) {
      const tokenPayload:any = decode(currentUser.accessToken)
      const permissions = tokenPayload.role.permissions;

      this.canAdd = this.isAccess(permissions, 'create_category');
      this.canUpdate = this.isAccess(permissions, 'update_category');
      this.canDelete = this.isAccess(permissions, 'delete_category');
    }
  }

  isAccess(permissions: any, permission: string) {
    return permissions.some((x) => x.name == permission);
  }

  async fetchCategories() : Promise<void> {
    let query: any = {
			page: this.paginator.page,
			limit: this.paginator.limit,
		};

    const res = await this.categoryService.getCategories(query);

    this.categories = res.data;
    this.paginator = res.paginator;
  }

  async addCategory(category: CategoryCreateUpdate) {
    await this.categoryService.create(category);
    this.messageService.add({
      severity: 'info',
      summary: 'Inserted',
      detail: 'Record inserted',
    });
    await this.fetchCategories();
  }

  async updateCategory(id: string, category: CategoryCreateUpdate) {
    await this.categoryService.update(id, category);
    this.messageService.add({
      severity: 'info',
      summary: 'Updated',
      detail: 'Record updated',
    });
    await this.fetchCategories();
  }

  paginate(event): void {
    this.paginator.limit = event.rows;
    this.paginator.page = event.first / event.rows + 1;
    document.getElementById('main-content')!.scrollTop = 0;
    this.fetchCategories();
  }

  openDialog(id: string | null): void {
    this.displayDialog = true;
    if (id) {
      this.selectedId = id;
    } else {
      this.selectedId = '';
    }
  }

  onHideDialog(data: any): void {
    this.displayDialog = false;
    if (data) {
      data.id ? this.updateCategory(data.id, data.category) : this.addCategory(data.category);
    }
  }

  openConfirmDialog(trademark): void {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xoá danh mục này không',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      // accept: () => {
      //   this.deleteTrademark(trademark);
      //   this.messageService.add({
      //     severity: 'info',
      //     summary: 'Confirmed',
      //     detail: 'Record deleted',
      //   });
      // },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
}
