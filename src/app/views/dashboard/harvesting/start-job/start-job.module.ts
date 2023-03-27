import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartJobPageRoutingModule } from './start-job-routing.module';

import { StartJobPage } from './start-job.page';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    StartJobPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [StartJobPage, WithLoadingPipe]
})
export class StartJobPageModule {}
