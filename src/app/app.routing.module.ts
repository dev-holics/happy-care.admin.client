import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path:'', component:PagesComponent, canActivate: [AuthGuard], children: [
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
      path: 'categories',
      loadChildren: () => import ('./pages/categories/categories.module').then(m => m.CategoriesModule),
      data: { breadcrumb : 'Categories'}
    },
    {
      path: 'categories/create',
      loadChildren: () => import('./pages/categories/create-categories/create-categories.module').then(m => m.CreateCategoriesModule),
      data: { breadcrumb: 'Categories/Create' }
    },
    ] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
