import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout.component';
export const routes = [
  { path: '', component: LogoutComponent, }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [
    LogoutComponent,
  ]
})
export class LogoutModule { }
