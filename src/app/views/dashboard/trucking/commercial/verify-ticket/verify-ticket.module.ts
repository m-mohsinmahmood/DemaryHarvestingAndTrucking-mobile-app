import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyTicketPageRoutingModule } from './verify-ticket-routing.module';

import { VerifyTicketPage } from './verify-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyTicketPageRoutingModule
  ],
  declarations: [VerifyTicketPage]
})
export class VerifyTicketPageModule {}
