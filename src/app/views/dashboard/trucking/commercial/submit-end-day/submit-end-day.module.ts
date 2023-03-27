import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitEndDayPageRoutingModule } from './submit-end-day-routing.module';

import { SubmitEndDayPage } from './submit-end-day.page';
import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitEndDayPageRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [SubmitEndDayPage, WithLoadingPipe]
})
export class SubmitEndDayPageModule { }
