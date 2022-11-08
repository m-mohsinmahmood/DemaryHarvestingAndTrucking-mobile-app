import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseOutOrderPageRoutingModule } from './close-out-order-routing.module';

import { CloseOutOrderPage } from './close-out-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CloseOutOrderPageRoutingModule
  ],
  declarations: [CloseOutOrderPage]
})
export class CloseOutOrderPageModule {}
