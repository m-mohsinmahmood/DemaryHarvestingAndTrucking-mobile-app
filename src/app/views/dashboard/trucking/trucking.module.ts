import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TruckingPageRoutingModule } from './trucking-routing.module';
import { TruckingPage } from './trucking.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { CheckInOutModule } from './../../../components/check-in-out/check-in-out.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruckingPageRoutingModule,
    HeaderModule,
    TimerModule,
    CheckInOutModule
  ],
  declarations: [TruckingPage]
})
export class TruckingPageModule { }
