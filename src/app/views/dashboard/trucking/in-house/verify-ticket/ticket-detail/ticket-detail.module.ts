import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketDetailPageRoutingModule } from './ticket-detail-routing.module';

import { TicketDetailPage } from './ticket-detail.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketDetailPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [TicketDetailPage]
})
export class TicketDetailPageModule { }
