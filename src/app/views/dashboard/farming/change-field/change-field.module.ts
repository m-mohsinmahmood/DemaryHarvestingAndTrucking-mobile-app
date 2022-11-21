import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChangeFieldPageRoutingModule } from './change-field-routing.module';
import { ChangeFieldPage } from './change-field.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeFieldPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [ChangeFieldPage]
})
export class ChangeFieldPageModule { }
