import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketGeneratedPageRoutingModule } from './ticket-generated-routing.module';

import { TicketGeneratedPage } from './ticket-generated.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketGeneratedPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [TicketGeneratedPage]
})
export class TicketGeneratedPageModule { }
