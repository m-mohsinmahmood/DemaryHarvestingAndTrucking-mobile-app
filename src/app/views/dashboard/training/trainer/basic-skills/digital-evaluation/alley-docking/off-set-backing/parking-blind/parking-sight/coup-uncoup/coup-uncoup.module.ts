import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoupUncoupPageRoutingModule } from './coup-uncoup-routing.module';

import { CoupUncoupPage } from './coup-uncoup.page';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoupUncoupPageRoutingModule,
    ReactiveFormsModule,
    TimerModule,
    HeaderModule
  ],
  declarations: [CoupUncoupPage]
})
export class CoupUncoupPageModule {}
