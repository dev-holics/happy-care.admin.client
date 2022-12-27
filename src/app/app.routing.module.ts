import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './shared/helpers/auth.guard';

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
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule),
        data: { breadcrumb: 'Roles', permission: 'read_role'}
      },
      {
        path: 'categories',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
        data: { breadcrumb: 'Categories', permission: 'read_category' },
      },
      {
        path: 'products',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/products/products.module').then((m) => m.ProductsModule)
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./pages/orders/orders.module').then((m) => m.OrdersModule)
      },
      {
        path: 'brands',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/brands/brands.module').then(
            (m) => m.TrademarksModule
          ),
        data: { breadcrumb: 'Products', permission: 'read_origin' },
      },
      {
        path: 'origins',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/origins/origins.module').then((m) => m.OriginsModule),
        data: { breadcrumb: 'Origins', permission: 'read_origin' },
      },
      {
        path: 'branches',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/branches/branches.module').then(
            (m) => m.BranchesModule
          ),
        data: { breadcrumb: 'Branches', permission: 'read_branch' },
      },
      {
        path: 'permissions',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/permissions/permissions.module').then(
            (m) => m.PermissionsModule
          ),
        data: { breadcrumb: 'Permissions', permission: 'read_permission' },
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/users/users.module').then(
            (m) => m.UsersModule
          ),
        data: { breadcrumb: 'Users', permission: 'read_user' },
      },
      {
        path: 'productLog',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/product-log/product-log.module').then(
            (m) => m.ProductLogModule
          ),
        data: { breadcrumb: 'ProductLog', permission: 'read_product_log' },
      },
      {
        path: 'products-of-branches',
        canActivate: [AuthGuard],
        loadChildren:() =>
          import ('./pages/products-of-branches/products-of-branches.module').then(
            (m) => m.ProductsOfBranchesModule
          ),
        data: { breadcrumb: 'Products Of Branches', permission: 'can_read_product_of_branch'}
      }
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
