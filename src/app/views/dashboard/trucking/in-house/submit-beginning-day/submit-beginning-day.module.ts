import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitBeginningDayPageRoutingModule } from './submit-beginning-day-routing.module';

import { WithLoadingPipe } from './../../../../../pipes/general-pipes/with-loading.pipe';
import { SubmitBeginningDayPage } from './submit-beginning-day.page';
import { HeaderModule } from './../../../../../components/header/header.module';
import { TimerModule } from './../../../../../components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitBeginningDayPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [SubmitBeginningDayPage, WithLoadingPipe]
})
export class SubmitBeginningDayPageModule { }
