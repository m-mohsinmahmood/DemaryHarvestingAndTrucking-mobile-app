import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommercialPageRoutingModule } from './commercial-routing.module';

import { CommercialPage } from './commercial.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    CommercialPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [CommercialPage]
})
export class CommercialPageModule {}
