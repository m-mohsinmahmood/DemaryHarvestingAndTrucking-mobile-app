import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeFieldPageRoutingModule } from './change-field-routing.module';

import { ChangeFieldPage } from './change-field.page';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { WithLoadingPipe } from 'src/app/pipes/general-pipes/with-loading.pipe';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    ChangeFieldPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule
  ],
  declarations: [ChangeFieldPage,WithLoadingPipe]
})
export class ChangeFieldPageModule {}
