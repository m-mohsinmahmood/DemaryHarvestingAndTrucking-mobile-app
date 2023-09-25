import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HarvestingGuestPageRoutingModule } from './harvesting-guest-routing.module';

import { HarvestingGuestPage } from './harvesting-guest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HarvestingGuestPageRoutingModule
  ],
  declarations: [HarvestingGuestPage]
})
export class HarvestingGuestPageModule {}
