import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InCabPageRoutingModule } from './in-cab-routing.module';

import { InCabPage } from './in-cab.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InCabPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [InCabPage]
})
export class InCabPageModule {}
