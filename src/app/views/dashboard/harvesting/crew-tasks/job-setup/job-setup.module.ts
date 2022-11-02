import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobSetupPageRoutingModule } from './job-setup-routing.module';

import { JobSetupPage } from './job-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobSetupPageRoutingModule
  ],
  declarations: [JobSetupPage]
})
export class JobSetupPageModule {}
