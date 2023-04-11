import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [DetailPage]
})
export class DetailPageModule {}
