import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExistingOrderPageRoutingModule } from './existing-order-routing.module';

import { ExistingOrderPage } from './existing-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExistingOrderPageRoutingModule
  ],
  declarations: [ExistingOrderPage]
})
export class ExistingOrderPageModule {}
