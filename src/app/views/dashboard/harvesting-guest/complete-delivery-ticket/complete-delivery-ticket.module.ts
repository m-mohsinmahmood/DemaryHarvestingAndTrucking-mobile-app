import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteDeliveryTicketPageRoutingModule } from './complete-delivery-ticket-routing.module';

import { CompleteDeliveryTicketPage } from './complete-delivery-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteDeliveryTicketPageRoutingModule
  ],
  declarations: [CompleteDeliveryTicketPage]
})
export class CompleteDeliveryTicketPageModule {}
