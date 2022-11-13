import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainerPageRoutingModule } from './trainer-routing.module';

import { TrainerPage } from './trainer.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    TrainerPageRoutingModule,
    HeaderModule
  ],
  declarations: [TrainerPage]
})
export class TrainerPageModule {}
