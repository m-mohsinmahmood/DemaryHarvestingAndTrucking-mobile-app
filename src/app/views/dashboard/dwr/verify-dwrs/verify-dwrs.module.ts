import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyDwrsPageRoutingModule } from './verify-dwrs-routing.module';

import { VerifyDwrsPage } from './verify-dwrs.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    VerifyDwrsPageRoutingModule,
    HeaderModule
  ],
  declarations: [VerifyDwrsPage]
})
export class VerifyDwrsPageModule {}
