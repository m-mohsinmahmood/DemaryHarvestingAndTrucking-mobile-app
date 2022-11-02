import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TractorDriverPageRoutingModule } from './tractor-driver-routing.module';

import { TractorDriverPage } from './tractor-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TractorDriverPageRoutingModule
  ],
  declarations: [TractorDriverPage]
})
export class TractorDriverPageModule {}
