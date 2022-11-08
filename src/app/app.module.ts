import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DomSanitizerPipe } from './pipes/dom-sanitizer/dom-sanitizer.pipe';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  declarations: [AppComponent, DomSanitizerPipe],
  imports: [
  BrowserModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    AppRoutingModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
