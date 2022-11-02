import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CombineOperatorTasksPageRoutingModule } from './combine-operator-tasks-routing.module';

import { CombineOperatorTasksPage } from './combine-operator-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CombineOperatorTasksPageRoutingModule
  ],
  declarations: [CombineOperatorTasksPage]
})
export class CombineOperatorTasksPageModule {}
