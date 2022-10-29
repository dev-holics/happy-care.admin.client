import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ProductsModule } from './pages/products/products.module';

const routes: Routes = [
  { 
    path:'', component: PagesComponent, canActivate: [AuthGuard], children: [
      {
        path: 'profile',
        loadChildren: () => import ('./pages/profile/profile.module').then(m => m.ProfileModule),
        data: { breadcrumb: 'Profile' }
      },
      {
        path: 'changePassword',
        loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordModule),
        data: { breadcrumb: 'ChangePassword'}
      },
      { 
        path: 'products', 
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) ,
        data: { breadcrumb: 'Products' }
      },
      { 
        path: 'origins', 
        loadChildren: () => import('./pages/origins/origins.module').then(m => m.OriginsModule) ,
        data: { breadcrumb: 'Products' }
      }
    ] 
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
