import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrewTasksPageRoutingModule } from './crew-tasks-routing.module';

import { CrewTasksPage } from './crew-tasks.page';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    CrewTasksPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CrewTasksPage ]
})
export class CrewTasksPageModule {}
