import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkingSightPageRoutingModule } from './parking-sight-routing.module';

import { ParkingSightPage } from './parking-sight.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkingSightPageRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [ParkingSightPage]
})
export class ParkingSightPageModule {}
