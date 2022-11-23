import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreTripFormPageRoutingModule } from './pre-trip-form-routing.module';

import { PreTripFormPage } from './pre-trip-form.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreTripFormPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [PreTripFormPage]
})
export class PreTripFormPageModule { }
