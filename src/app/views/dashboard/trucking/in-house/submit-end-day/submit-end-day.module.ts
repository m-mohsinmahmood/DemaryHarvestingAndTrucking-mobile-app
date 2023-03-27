import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitEndDayPageRoutingModule } from './submit-end-day-routing.module';

import { SubmitEndDayPage } from './submit-end-day.page';
import { WithLoadingPipe } from './../../../../../pipes/general-pipes/with-loading.pipe';
import { HeaderModule } from './../../../../../components/header/header.module';
import { TimerModule } from './../../../../../components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitEndDayPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [SubmitEndDayPage, WithLoadingPipe]
})
export class SubmitEndDayPageModule { }
