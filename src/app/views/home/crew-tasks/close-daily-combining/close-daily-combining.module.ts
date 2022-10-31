import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseDailyCombiningPageRoutingModule } from './close-daily-combining-routing.module';

import { CloseDailyCombiningPage } from './close-daily-combining.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CloseDailyCombiningPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CloseDailyCombiningPage]
})
export class CloseDailyCombiningPageModule {}
