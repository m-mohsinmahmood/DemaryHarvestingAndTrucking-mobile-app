import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratedTicketPageRoutingModule } from './generated-ticket-routing.module';

import { GeneratedTicketPage } from './generated-ticket.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratedTicketPageRoutingModule,
    HeaderModule,
    TimerModule

  ],
  declarations: [GeneratedTicketPage]
})
export class GeneratedTicketPageModule {}
