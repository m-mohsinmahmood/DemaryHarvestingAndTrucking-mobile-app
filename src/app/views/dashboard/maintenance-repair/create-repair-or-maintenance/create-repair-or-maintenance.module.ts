import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateRepairORMaintenancePageRoutingModule } from './create-repair-or-maintenance-routing.module';
import { CreateRepairORMaintenancePage } from './create-repair-or-maintenance.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';

@NgModule({
  imports: [
    TimerModule,
    HeaderModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRepairORMaintenancePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateRepairORMaintenancePage, WithLoadingPipe]
})
export class CreateRepairORMaintenancePageModule { }
