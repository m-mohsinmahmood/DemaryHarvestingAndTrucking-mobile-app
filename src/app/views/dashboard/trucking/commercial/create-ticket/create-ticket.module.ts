import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateTicketPageRoutingModule } from './create-ticket-routing.module';
import { CreateTicketPage } from './create-ticket.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { WithLoadingPipe } from './../../../../../pipes/general-pipes/with-loading.pipe';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    CreateTicketPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [CreateTicketPage, WithLoadingPipe]
})
export class CreateTicketPageModule { }
