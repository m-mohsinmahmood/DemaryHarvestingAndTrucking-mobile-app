import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratedTicketPageRoutingModule } from './generated-ticket-routing.module';

import { GeneratedTicketPage } from './generated-ticket.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratedTicketPageRoutingModule,
    HeaderModule,
    ReactiveFormsModule,
    TimerModule
  ],
  declarations: [GeneratedTicketPage, WithLoadingPipe]
})
export class GeneratedTicketPageModule {}
