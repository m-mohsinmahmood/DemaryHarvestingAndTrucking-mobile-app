import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreTripPageRoutingModule } from './pre-trip-routing.module';

import { PreTripPage } from './pre-trip.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    PreTripPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [PreTripPage]
})
export class PreTripPageModule {}
