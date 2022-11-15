import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingRecordsPageRoutingModule } from './training-records-routing.module';

import { TrainingRecordsPage } from './training-records.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    TrainingRecordsPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [TrainingRecordsPage]
})
export class TrainingRecordsPageModule {}
