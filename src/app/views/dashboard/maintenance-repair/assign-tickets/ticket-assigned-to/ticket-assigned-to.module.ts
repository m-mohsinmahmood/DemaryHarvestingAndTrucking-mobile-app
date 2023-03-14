import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TicketAssignedToPageRoutingModule } from './ticket-assigned-to-routing.module';
import { TicketAssignedToPage } from './ticket-assigned-to.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';

@NgModule({
  imports: [
    HeaderModule,
    TimerModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TicketAssignedToPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TicketAssignedToPage, WithLoadingPipe]
})
export class TicketAssignedToPageModule { }
