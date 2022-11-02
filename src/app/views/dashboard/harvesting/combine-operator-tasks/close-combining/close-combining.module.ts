import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseCombiningPageRoutingModule } from './close-combining-routing.module';

import { CloseCombiningPage } from './close-combining.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CloseCombiningPageRoutingModule
  ],
  declarations: [CloseCombiningPage]
})
export class CloseCombiningPageModule {}
