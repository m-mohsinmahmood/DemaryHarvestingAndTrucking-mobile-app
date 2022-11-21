import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FarmingPageRoutingModule } from './farming-routing.module';
import { FarmingPage } from './farming.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    HeaderModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FarmingPageRoutingModule
  ],
  declarations: [FarmingPage]
})
export class FarmingPageModule { }
