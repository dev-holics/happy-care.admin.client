import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriesDialogComponent } from './components/categories-dialog/categories-dialog.component';

export const routes = [
  {
      path: '',
      component: CategoriesComponent,
  }
];

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    ToolbarModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ToastModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class CategoriesModule { }
