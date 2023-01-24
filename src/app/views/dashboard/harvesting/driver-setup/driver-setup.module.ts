import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverSetupPageRoutingModule } from './driver-setup-routing.module';

import { DriverSetupPage } from './driver-setup.page';

import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverSetupPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule,
  ],
  declarations: [DriverSetupPage, WithLoadingPipe],
})
export class DriverSetupPageModule {}
