import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkingBlindPageRoutingModule } from './parking-blind-routing.module';

import { ParkingBlindPage } from './parking-blind.page';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkingBlindPageRoutingModule,
    ReactiveFormsModule,
    TimerModule,
    HeaderModule
  ],
  declarations: [ParkingBlindPage]
})
export class ParkingBlindPageModule {}
