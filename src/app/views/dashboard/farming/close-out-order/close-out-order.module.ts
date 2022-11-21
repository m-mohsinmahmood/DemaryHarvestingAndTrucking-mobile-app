import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseOutOrderPageRoutingModule } from './close-out-order-routing.module';

import { CloseOutOrderPage } from './close-out-order.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CloseOutOrderPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [CloseOutOrderPage]
})
export class CloseOutOrderPageModule { }
