import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobSetupPageRoutingModule } from './job-setup-routing.module';

import { JobSetupPage } from './job-setup.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    JobSetupPageRoutingModule,
    HeaderModule,
    TimerModule,
    ReactiveFormsModule

  ],
  declarations: [JobSetupPage]
})
export class JobSetupPageModule {}
