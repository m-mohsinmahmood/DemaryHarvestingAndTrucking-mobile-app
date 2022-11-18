import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommercialPageRoutingModule } from './commercial-routing.module';

import { CommercialPage } from './commercial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommercialPageRoutingModule
  ],
  declarations: [CommercialPage]
})
export class CommercialPageModule {}
