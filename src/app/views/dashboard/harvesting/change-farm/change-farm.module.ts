import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeFarmPageRoutingModule } from './change-farm-routing.module';

import { ChangeFarmPage } from './change-farm.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    ChangeFarmPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [ChangeFarmPage]
})
export class ChangeFarmPageModule {}
