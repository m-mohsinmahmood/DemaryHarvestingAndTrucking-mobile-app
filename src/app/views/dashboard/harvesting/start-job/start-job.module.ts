import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartJobPageRoutingModule } from './start-job-routing.module';

import { StartJobPage } from './start-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartJobPageRoutingModule
  ],
  declarations: [StartJobPage]
})
export class StartJobPageModule {}
