import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatNativeDateModule } from '@angular/material/core'; // si o si para el DatePicker
import { HttpClientModule } from '@angular/common/http';

import es from '@angular/common/locales/es';
import esAR from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

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
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([])
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-AR',
  }, 
],
  bootstrap: [AppComponent]
})
export class AppModule { }