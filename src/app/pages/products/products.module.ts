import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

export const routes: Routes = [
  { path: '', component: ProductsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
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
  declarations: [
    ProductDialogComponent,
    ProductsComponent
  ],
  providers: [
    DialogService
  ],
})
export class ProductsModule {}
