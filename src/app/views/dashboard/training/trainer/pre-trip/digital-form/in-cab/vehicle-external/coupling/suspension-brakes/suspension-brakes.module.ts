import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuspensionBrakesPageRoutingModule } from './suspension-brakes-routing.module';

import { SuspensionBrakesPage } from './suspension-brakes.page';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuspensionBrakesPageRoutingModule,
    TimerModule,
    HeaderModule,
    ReactiveFormsModule
  ],
  declarations: [SuspensionBrakesPage]
})
export class SuspensionBrakesPageModule {}
