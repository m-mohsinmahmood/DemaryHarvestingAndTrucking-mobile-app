import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseOutPageRoutingModule } from './close-out-routing.module';

import { CloseOutPage } from './close-out.page';

import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    CloseOutPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [CloseOutPage]
})
export class CloseOutPageModule {}
