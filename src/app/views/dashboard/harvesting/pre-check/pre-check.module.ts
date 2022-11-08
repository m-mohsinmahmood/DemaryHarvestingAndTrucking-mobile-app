import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreCheckPageRoutingModule } from './pre-check-routing.module';

import { PreCheckPage } from './pre-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreCheckPageRoutingModule
  ],
  declarations: [PreCheckPage]
})
export class PreCheckPageModule {}
