import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatNativeDateModule } from '@angular/material/core'; // si o si para el DatePicker

import es from '@angular/common/locales/es';
import esAR from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';

registerLocaleData(es); // registra en la app todo el idioma español completo
registerLocaleData(esAR); //registra solo para argentina

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    MatNativeDateModule,
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-AR',
  }, 
],
  bootstrap: [AppComponent]
})
export class AppModule { }