import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigitalFormPageRoutingModule } from './digital-form-routing.module';

import { DigitalFormPage } from './digital-form.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    DigitalFormPageRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    TimerModule

  ],
  declarations: [DigitalFormPage]
})
export class DigitalFormPageModule {}
