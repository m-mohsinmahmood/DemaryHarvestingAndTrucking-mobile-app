import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyOrdersPageRoutingModule } from './verify-orders-routing.module';

import { VerifyOrdersPage } from './verify-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyOrdersPageRoutingModule
  ],
  declarations: [VerifyOrdersPage]
})
export class VerifyOrdersPageModule {}
