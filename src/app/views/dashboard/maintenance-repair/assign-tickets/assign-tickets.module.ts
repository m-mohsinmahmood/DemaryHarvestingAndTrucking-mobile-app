import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssignTicketsPageRoutingModule } from './assign-tickets-routing.module';
import { AssignTicketsPage } from './assign-tickets.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignTicketsPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [AssignTicketsPage]
})
export class AssignTicketsPageModule { }
