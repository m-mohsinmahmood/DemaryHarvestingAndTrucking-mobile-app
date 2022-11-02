import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KartOperatorTasksPageRoutingModule } from './kart-operator-tasks-routing.module';

import { KartOperatorTasksPage } from './kart-operator-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KartOperatorTasksPageRoutingModule
  ],
  declarations: [KartOperatorTasksPage]
})
export class KartOperatorTasksPageModule {}
