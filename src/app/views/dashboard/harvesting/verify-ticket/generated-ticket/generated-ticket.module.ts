import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratedTicketPageRoutingModule } from './generated-ticket-routing.module';

import { GeneratedTicketPage } from './generated-ticket.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    GeneratedTicketPageRoutingModule,
    HeaderModule
  ],
  declarations: [GeneratedTicketPage]
})
export class GeneratedTicketPageModule {}
