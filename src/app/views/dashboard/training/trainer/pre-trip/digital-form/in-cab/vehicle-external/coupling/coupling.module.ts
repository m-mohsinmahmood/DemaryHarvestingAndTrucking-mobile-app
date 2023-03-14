import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouplingPageRoutingModule } from './coupling-routing.module';

import { CouplingPage } from './coupling.page';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouplingPageRoutingModule,
    TimerModule,
    HeaderModule,
    ReactiveFormsModule
  ],
  declarations: [CouplingPage]
})
export class CouplingPageModule {}
