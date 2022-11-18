import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasicSkillsPageRoutingModule } from './basic-skills-routing.module';

import { BasicSkillsPage } from './basic-skills.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    BasicSkillsPageRoutingModule,
    HeaderModule,
    TimerModule
  ],
  declarations: [BasicSkillsPage]
})
export class BasicSkillsPageModule {}
