import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CompleteExistingTicketPageRoutingModule } from './complete-existing-ticket-routing.module';
import { CompleteExistingTicketPage } from './complete-existing-ticket.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    HeaderModule,
    TimerModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteExistingTicketPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CompleteExistingTicketPage]
})
export class CompleteExistingTicketPageModule { }
