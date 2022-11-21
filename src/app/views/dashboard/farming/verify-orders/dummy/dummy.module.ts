import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DummyPageRoutingModule } from './dummy-routing.module';

import { DummyPage } from './dummy.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DummyPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [DummyPage]
})
export class DummyPageModule {}
