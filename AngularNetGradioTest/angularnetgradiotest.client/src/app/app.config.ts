import { ApplicationConfig } from '@angular/core';
import { provideRouter } from "@angular/router";
import { provideHttpClient } from '@angular/common/http';
import { routes } from "./app.routes"

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()]
};


//import { platformBrowser, BrowserModule, bootstrapApplication } from '@angular/platform-browser';

//import { HttpClientModule } from '@angular/common/http';
//import { AppRoutingModule } from './app/app-routing.module';
//import { AppComponent } from './app/app.component';
//import { importProvidersFrom } from '@angular/core';

//bootstrapApplication(AppComponent, {
//    providers: [importProvidersFrom(BrowserModule, HttpClientModule, AppRoutingModule)]
//})
//  .catch(err => console.error(err));
