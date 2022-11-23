import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletePreCheckFormPageRoutingModule } from './complete-pre-check-form-routing.module';

import { CompletePreCheckFormPage } from './complete-pre-check-form.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletePreCheckFormPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [CompletePreCheckFormPage]
})
export class CompletePreCheckFormPageModule { }
