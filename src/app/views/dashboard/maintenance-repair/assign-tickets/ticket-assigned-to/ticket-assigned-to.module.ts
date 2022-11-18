import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TicketAssignedToPageRoutingModule } from './ticket-assigned-to-routing.module';
import { TicketAssignedToPage } from './ticket-assigned-to.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    HeaderModule,
    TimerModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TicketAssignedToPageRoutingModule
  ],
  declarations: [TicketAssignedToPage]
})
export class TicketAssignedToPageModule { }
