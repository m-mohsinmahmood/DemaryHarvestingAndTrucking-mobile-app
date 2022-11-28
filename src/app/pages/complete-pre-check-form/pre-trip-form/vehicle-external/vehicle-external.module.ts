import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VehicleExternalPageRoutingModule } from './vehicle-external-routing.module';
import { VehicleExternalPage } from './vehicle-external.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from './../../../../components/timer/timer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleExternalPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [VehicleExternalPage]
})
export class VehicleExternalPageModule { }
