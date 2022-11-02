import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TruckDriverTasksPageRoutingModule } from './truck-driver-tasks-routing.module';

import { TruckDriverTasksPage } from './truck-driver-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruckDriverTasksPageRoutingModule
  ],
  declarations: [TruckDriverTasksPage]
})
export class TruckDriverTasksPageModule {}
