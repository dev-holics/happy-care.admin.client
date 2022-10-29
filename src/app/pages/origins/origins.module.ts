import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OriginsComponent } from './origins.component';

export const routes: Routes = [
  { path: '', component: OriginsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    OriginsComponent
  ],
  providers: [
  ],
})
export class OriginsModule {}
