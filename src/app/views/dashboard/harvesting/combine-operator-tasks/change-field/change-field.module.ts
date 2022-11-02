import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeFieldPageRoutingModule } from './change-field-routing.module';

import { ChangeFieldPage } from './change-field.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeFieldPageRoutingModule
  ],
  declarations: [ChangeFieldPage]
})
export class ChangeFieldPageModule {}
