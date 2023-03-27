import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewJobPageRoutingModule } from './view-job-routing.module';

import { ViewJobPage } from './view-job.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    ViewJobPageRoutingModule,
    HeaderModule,
    ReactiveFormsModule
  ],
  declarations: [ViewJobPage]
})
export class ViewJobPageModule {}
