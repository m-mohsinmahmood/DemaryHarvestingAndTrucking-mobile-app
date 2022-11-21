import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TruckingPageRoutingModule } from './trucking-routing.module';

import { TruckingPage } from './trucking.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruckingPageRoutingModule,
    HeaderModule
  ],
  declarations: [TruckingPage]
})
export class TruckingPageModule {}
