import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  // {path:'', component:PagesComponent},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
