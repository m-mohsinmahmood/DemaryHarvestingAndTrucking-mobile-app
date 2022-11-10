import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartJobPageRoutingModule } from './start-job-routing.module';

import { StartJobPage } from './start-job.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    StartJobPageRoutingModule,
    HeaderModule
  ],
  declarations: [StartJobPage]
})
export class StartJobPageModule {}
