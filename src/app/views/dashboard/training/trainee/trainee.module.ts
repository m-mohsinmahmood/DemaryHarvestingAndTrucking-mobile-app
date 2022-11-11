import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TraineePageRoutingModule } from './trainee-routing.module';

import { TraineePage } from './trainee.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    TraineePageRoutingModule,
    HeaderModule
  ],
  declarations: [TraineePage]
})
export class TraineePageModule {}
