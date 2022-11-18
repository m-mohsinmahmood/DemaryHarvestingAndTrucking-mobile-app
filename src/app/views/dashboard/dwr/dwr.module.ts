import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DwrPageRoutingModule } from './dwr-routing.module';

import { DwrPage } from './dwr.page';

import { HeaderModule } from 'src/app/components/header/header.module';
@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    DwrPageRoutingModule,
    HeaderModule
  ],
  declarations: [DwrPage]
})
export class DwrPageModule {}
