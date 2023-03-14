import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitBeginningDayPageRoutingModule } from './submit-beginning-day-routing.module';

import { SubmitBeginningDayPage } from './submit-beginning-day.page';
import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitBeginningDayPageRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [SubmitBeginningDayPage, WithLoadingPipe]
})
export class SubmitBeginningDayPageModule { }
