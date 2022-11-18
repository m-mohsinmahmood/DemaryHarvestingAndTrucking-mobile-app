import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingTasksPageRoutingModule } from './training-tasks-routing.module';

import { TrainingTasksPage } from './training-tasks.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    TrainingTasksPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [TrainingTasksPage]
})
export class TrainingTasksPageModule {}
