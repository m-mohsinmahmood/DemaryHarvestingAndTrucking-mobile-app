import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteExistingOrderPageRoutingModule } from './complete-existing-order-routing.module';

import { CompleteExistingOrderPage } from './complete-existing-order.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { WithLoadingPipe } from './../../../../../pipes/general-pipes/with-loading.pipe';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    CompleteExistingOrderPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [CompleteExistingOrderPage, WithLoadingPipe]
})
export class CompleteExistingOrderPageModule { }
