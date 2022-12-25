import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    data: {
      breadcrumb: 'Orders',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
