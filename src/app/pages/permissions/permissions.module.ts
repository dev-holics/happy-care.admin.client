import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PermissionsComponent } from './permissions.component';
import { PermissionsDialogComponent } from './permissions-dialog/permissions-dialog.component';

export const routes = [
  {
      path: '',
      component: PermissionsComponent,
  }
];

@NgModule({
  declarations: [
    PermissionsComponent,
    PermissionsDialogComponent,
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
export class PermissionsModule { }
