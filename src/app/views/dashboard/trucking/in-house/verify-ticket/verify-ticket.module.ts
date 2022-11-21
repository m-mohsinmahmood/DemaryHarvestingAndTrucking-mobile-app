import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyTicketPageRoutingModule } from './verify-ticket-routing.module';

import { VerifyTicketPage } from './verify-ticket.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyTicketPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [VerifyTicketPage]
})
export class VerifyTicketPageModule {}
