import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS}from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { PagesComponent } from './pages/pages.component';

import { AppSettings } from './app.settings';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    AppComponent,
    VerticalMenuComponent,
    SidenavComponent,
    PagesComponent,
    UserMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ButtonModule,
    MenuModule,
    TableModule,
    DynamicDialogModule
  ],
  providers: [AppSettings,
    { provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi: true},
    { provide: OverlayContainer, useClass: CustomOverlayContainer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
