import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReassignTicketPageRoutingModule } from './reassign-ticket-routing.module';

import { ReassignTicketPage } from './reassign-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReassignTicketPageRoutingModule
  ],
  declarations: [ReassignTicketPage]
})
export class ReassignTicketPageModule {}
