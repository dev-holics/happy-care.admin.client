import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS}from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { PagesComponent } from './pages/pages.component';

import { AppSettings } from './app.settings';
import { OverlayContainer } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [AppSettings,
    { provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi: true},
    { provide: OverlayContainer, useClass: CustomOverlayContainer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
