import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseJobPageRoutingModule } from './close-job-routing.module';

import { CloseJobPage } from './close-job.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    CloseJobPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [CloseJobPage]
})
export class CloseJobPageModule {}
