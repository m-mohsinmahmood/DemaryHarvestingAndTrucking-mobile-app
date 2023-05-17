import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseOutPageRoutingModule } from './close-out-routing.module';

import { CloseOutPage } from './close-out.page';

import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { WithLoadingPipe } from './../../../../pipes/general-pipes/with-loading.pipe';
@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    CloseOutPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule,
  ],
  declarations: [CloseOutPage,WithLoadingPipe]
})
export class CloseOutPageModule {}
