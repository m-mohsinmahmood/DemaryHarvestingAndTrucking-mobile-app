import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyTicketPageRoutingModule } from './verify-ticket-routing.module';

import { VerifyTicketPage } from './verify-ticket.page';
import { HeaderComponent } from './../../../../components/header/header.component';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    VerifyTicketPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [VerifyTicketPage,WithLoadingPipe]
})
export class VerifyTicketPageModule {}
