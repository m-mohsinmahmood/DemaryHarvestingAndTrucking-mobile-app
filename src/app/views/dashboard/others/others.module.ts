import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OthersPageRoutingModule } from './others-routing.module';

import { OthersPage } from './others.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';
import { CheckInOutModule } from 'src/app/components/check-in-out/check-in-out.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OthersPageRoutingModule,
    HeaderModule,
    TimerModule,
    CheckInOutModule,
    ReactiveFormsModule
  ],
  declarations: [OthersPage, WithLoadingPipe]
})
export class OthersPageModule { }
