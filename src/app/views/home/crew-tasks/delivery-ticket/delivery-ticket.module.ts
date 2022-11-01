import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryTicketPageRoutingModule } from './delivery-ticket-routing.module';

import { DeliveryTicketPage } from './delivery-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryTicketPageRoutingModule
  ],
  declarations: [DeliveryTicketPage]
})
export class DeliveryTicketPageModule {}
