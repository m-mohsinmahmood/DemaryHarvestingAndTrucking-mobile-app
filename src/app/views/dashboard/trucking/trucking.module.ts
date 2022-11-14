import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TruckingPageRoutingModule } from './trucking-routing.module';

import { TruckingPage } from './trucking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruckingPageRoutingModule
  ],
  declarations: [TruckingPage]
})
export class TruckingPageModule {}
