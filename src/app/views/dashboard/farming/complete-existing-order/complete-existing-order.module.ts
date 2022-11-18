import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteExistingOrderPageRoutingModule } from './complete-existing-order-routing.module';

import { CompleteExistingOrderPage } from './complete-existing-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteExistingOrderPageRoutingModule
  ],
  declarations: [CompleteExistingOrderPage]
})
export class CompleteExistingOrderPageModule {}
