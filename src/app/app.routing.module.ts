import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
        data: { breadcrumb: 'Profile' },
      },
      {
        path: 'changePassword',
        loadChildren: () =>
          import('./pages/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
        data: { breadcrumb: 'ChangePassword' },
      },
      {
        path: 'roles',
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule),
        data: { breadcrumb: 'Roles'}
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./pages/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
        data: { breadcrumb: 'Categories' },
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products/products.module').then(
            (m) => m.ProductsModule
          ),
        data: { breadcrumb: 'Products' },
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./pages/orders/orders.module').then((m) => m.OrdersModule)
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./pages/brands/brands.module').then(
            (m) => m.TrademarksModule
          ),
        data: { breadcrumb: 'Products' },
      },
      {
        path: 'origins',
        loadChildren: () =>
          import('./pages/origins/origins.module').then((m) => m.OriginsModule),
        data: { breadcrumb: 'Origins' },
      },
      {
        path: 'branches',
        loadChildren: () =>
          import('./pages/branches/branches.module').then(
            (m) => m.BranchesModule
          ),
        data: { breadcrumb: 'Branches' },
      },
      {
        path: 'permissions',
        loadChildren: () =>
          import('./pages/permissions/permissions.module').then(
            (m) => m.PermissionsModule
          ),
        data: { breadcrumb: 'Permissions' },
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.module').then(
            (m) => m.UsersModule
          ),
        data: { breadcrumb: 'Users' },
      },
      {
        path: 'productLog',
        loadChildren: () =>
          import('./pages/product-log/product-log.module').then(
            (m) => m.ProductLogModule
          ),
        data: { breadcrumb: 'ProductLog' },
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'logout',
    loadChildren: () =>
      import('./pages/logout/logout.module').then((m) => m.LogoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
