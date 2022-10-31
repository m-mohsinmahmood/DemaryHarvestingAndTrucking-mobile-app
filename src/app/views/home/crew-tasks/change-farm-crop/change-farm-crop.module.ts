import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeFarmCropPageRoutingModule } from './change-farm-crop-routing.module';

import { ChangeFarmCropPage } from './change-farm-crop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeFarmCropPageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [ChangeFarmCropPage]
})
export class ChangeFarmCropPageModule {}
