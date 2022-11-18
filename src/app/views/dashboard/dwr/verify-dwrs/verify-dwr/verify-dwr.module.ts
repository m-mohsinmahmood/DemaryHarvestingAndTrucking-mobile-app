import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyDwrPageRoutingModule } from './verify-dwr-routing.module';

import { VerifyDwrPage } from './verify-dwr.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    VerifyDwrPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [VerifyDwrPage]
})
export class VerifyDwrPageModule {}
