import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { ProductLogComponent } from './components/product-log/product-log.component';
import { AuthGuard } from 'src/app/shared/helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    data: {
      breadcrumb: 'Products',
    }
  },
  {
    path: 'log',
    component: ProductLogComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Product log',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
