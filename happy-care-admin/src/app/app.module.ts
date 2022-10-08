import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
// import { PagesComponent } from './pages/pages.component';

import { AppSettings } from './app.settings';


@NgModule({
  declarations: [
    AppComponent,
    //PagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [AppSettings],
  bootstrap: [AppComponent]
})
export class AppModule { }
