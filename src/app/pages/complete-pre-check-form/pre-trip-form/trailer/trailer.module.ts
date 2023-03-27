import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrailerPageRoutingModule } from './trailer-routing.module';
import { TrailerPage } from './trailer.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    TrailerPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [TrailerPage]
})
export class TrailerPageModule { }
