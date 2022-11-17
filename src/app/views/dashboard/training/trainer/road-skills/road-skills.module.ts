import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoadSkillsPageRoutingModule } from './road-skills-routing.module';

import { RoadSkillsPage } from './road-skills.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    RoadSkillsPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [RoadSkillsPage]
})
export class RoadSkillsPageModule {}
