import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreCheckFormDetailPageRoutingModule } from './pre-check-form-detail-routing.module';

import { PreCheckFormDetailPage } from './pre-check-form-detail.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreCheckFormDetailPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [PreCheckFormDetailPage]
})
export class PreCheckFormDetailPageModule { }
