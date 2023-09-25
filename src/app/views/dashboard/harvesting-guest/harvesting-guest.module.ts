import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HarvestingGuestPageRoutingModule } from './harvesting-guest-routing.module';
import { HarvestingGuestPage } from './harvesting-guest.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HarvestingGuestPageRoutingModule,
    HeaderModule
  ],
  declarations: [HarvestingGuestPage]
})
export class HarvestingGuestPageModule { }
