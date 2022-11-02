import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReassignTicketsPageRoutingModule } from './reassign-tickets-routing.module';

import { ReassignTicketsPage } from './reassign-tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReassignTicketsPageRoutingModule
  ],
  declarations: [ReassignTicketsPage]
})
export class ReassignTicketsPageModule {}
