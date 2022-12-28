import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartModule } from 'primeng/chart';
import { DashboardComponent } from './dashboard.component';

export const routes = [
  {
      path: '',
      component: DashboardComponent,
  }
];

@NgModule({
  imports: [ChartModule, CommonModule, SharedModule.forRoot(), RouterModule.forChild(routes)],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
