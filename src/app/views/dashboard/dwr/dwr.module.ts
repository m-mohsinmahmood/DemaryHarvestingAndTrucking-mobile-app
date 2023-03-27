import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DwrPageRoutingModule } from './dwr-routing.module';

import { DwrPage } from './dwr.page';

import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    DwrPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [DwrPage]
})
export class DwrPageModule {}
