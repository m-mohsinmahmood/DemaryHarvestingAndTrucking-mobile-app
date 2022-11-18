import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InHousePageRoutingModule } from './in-house-routing.module';

import { InHousePage } from './in-house.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InHousePageRoutingModule
  ],
  declarations: [InHousePage]
})
export class InHousePageModule {}
