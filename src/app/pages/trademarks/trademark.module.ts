import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { TrademarkDialogComponent } from './trademark-dialog/trademark-dialog.component';
import { TrademarksComponent } from './trademarks.component';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

export const routes: Routes = [
  { path: '', component: TrademarksComponent, pathMatch: 'full' },
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
    TrademarkDialogComponent,
    TrademarksComponent
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
})
export class TrademarksModule {}
