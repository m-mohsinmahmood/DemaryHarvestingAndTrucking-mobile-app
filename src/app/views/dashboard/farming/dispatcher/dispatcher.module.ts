import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispatcherPageRoutingModule } from './dispatcher-routing.module';

import { DispatcherPage } from './dispatcher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispatcherPageRoutingModule
  ],
  declarations: [DispatcherPage]
})
export class DispatcherPageModule {}
