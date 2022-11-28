import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CouplingPageRoutingModule } from './coupling-routing.module';
import { CouplingPage } from './coupling.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    CouplingPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [CouplingPage]
})
export class CouplingPageModule { }
