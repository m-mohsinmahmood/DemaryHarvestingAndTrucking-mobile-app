import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigitalEvaluationPageRoutingModule } from './digital-evaluation-routing.module';

import { DigitalEvaluationPage } from './digital-evaluation.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    DigitalEvaluationPageRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [DigitalEvaluationPage]
})
export class DigitalEvaluationPageModule {}
