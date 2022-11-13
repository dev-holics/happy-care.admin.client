import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OriginsComponent } from './components/origins/origins.component';
import { OriginDialogComponent } from './components/origin-dialog/origin-dialog.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

export const routes: Routes = [
  { path: '', component: OriginsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    MessagesModule,
    MessageModule
  ],
  declarations: [
    OriginDialogComponent,
    OriginsComponent
  ],
  providers: [
    MessageService
  ],
})
export class OriginsModule {}
