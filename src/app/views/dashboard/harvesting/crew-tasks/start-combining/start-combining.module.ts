import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartCombiningPageRoutingModule } from './start-combining-routing.module';

import { StartCombiningPage } from './start-combining.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartCombiningPageRoutingModule
  ],
  declarations: [StartCombiningPage]
})
export class StartCombiningPageModule {}
