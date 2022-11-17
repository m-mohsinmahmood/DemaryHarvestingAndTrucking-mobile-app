import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartJobPageRoutingModule } from './start-job-routing.module';

import { StartJobPage } from './start-job.page';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    StartJobPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [StartJobPage]
})
export class StartJobPageModule {}
