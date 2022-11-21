import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyDwrsPageRoutingModule } from './verify-dwrs-routing.module';

import { VerifyDwrsPage } from './verify-dwrs.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    VerifyDwrsPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [VerifyDwrsPage]
})
export class VerifyDwrsPageModule {}
