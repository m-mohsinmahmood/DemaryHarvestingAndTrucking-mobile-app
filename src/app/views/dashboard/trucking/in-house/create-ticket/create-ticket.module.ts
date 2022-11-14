import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTicketPageRoutingModule } from './create-ticket-routing.module';

import { CreateTicketPage } from './create-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTicketPageRoutingModule
  ],
  declarations: [CreateTicketPage]
})
export class CreateTicketPageModule {}
