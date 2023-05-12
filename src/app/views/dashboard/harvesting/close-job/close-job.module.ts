import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseJobPageRoutingModule } from './close-job-routing.module';

import { CloseJobPage } from './close-job.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    CloseJobPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [CloseJobPage,WithLoadingPipe]
})
export class CloseJobPageModule {}
