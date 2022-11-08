import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseJobPageRoutingModule } from './close-job-routing.module';

import { CloseJobPage } from './close-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CloseJobPageRoutingModule
  ],
  declarations: [CloseJobPage]
})
export class CloseJobPageModule {}
