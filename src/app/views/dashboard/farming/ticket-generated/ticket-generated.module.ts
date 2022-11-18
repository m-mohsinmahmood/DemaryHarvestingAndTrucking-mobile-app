import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketGeneratedPageRoutingModule } from './ticket-generated-routing.module';

import { TicketGeneratedPage } from './ticket-generated.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketGeneratedPageRoutingModule
  ],
  declarations: [TicketGeneratedPage]
})
export class TicketGeneratedPageModule {}
