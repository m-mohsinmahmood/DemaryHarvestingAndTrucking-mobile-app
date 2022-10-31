import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartDailyCombiningPageRoutingModule } from './start-daily-combining-routing.module';

import { StartDailyCombiningPage } from './start-daily-combining.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartDailyCombiningPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StartDailyCombiningPage]
})
export class StartDailyCombiningPageModule {}
