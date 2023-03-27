import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaintenanceRepairPageRoutingModule } from './maintenance-repair-routing.module';
import { MaintenanceRepairPage } from './maintenance-repair.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { CheckInOutModule } from './../../../components/check-in-out/check-in-out.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceRepairPageRoutingModule,
    HeaderModule,
    TimerModule,
    CheckInOutModule
  ],
  declarations: [MaintenanceRepairPage]
})
export class MaintenanceRepairPageModule { }
