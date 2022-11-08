import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeFarmPageRoutingModule } from './change-farm-routing.module';

import { ChangeFarmPage } from './change-farm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeFarmPageRoutingModule
  ],
  declarations: [ChangeFarmPage]
})
export class ChangeFarmPageModule {}
