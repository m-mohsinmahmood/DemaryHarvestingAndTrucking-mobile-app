import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeFieldPageRoutingModule } from './change-field-routing.module';

import { ChangeFieldPage } from './change-field.page';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    ChangeFieldPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [ChangeFieldPage]
})
export class ChangeFieldPageModule {}
