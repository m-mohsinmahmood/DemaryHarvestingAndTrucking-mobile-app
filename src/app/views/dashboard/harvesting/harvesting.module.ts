import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HarvestingPageRoutingModule } from './harvesting-routing.module';

import { HarvestingPage } from './harvesting.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    HarvestingPageRoutingModule,
    HeaderModule
  ],
  declarations: [HarvestingPage]
})
export class HarvestingPageModule {}
