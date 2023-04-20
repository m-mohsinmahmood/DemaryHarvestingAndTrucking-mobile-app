import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlleyDocking90PageRoutingModule } from './alley-docking90-routing.module';

import { AlleyDocking90Page } from './alley-docking90.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlleyDocking90PageRoutingModule,
    ReactiveFormsModule,
    HeaderModule
  ],
  declarations: [AlleyDocking90Page]
})
export class AlleyDocking90PageModule {}
