import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeFarmPageRoutingModule } from './change-farm-routing.module';

import { ChangeFarmPage } from './change-farm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeFarmPageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [ChangeFarmPage]
})
export class ChangeFarmPageModule {}
