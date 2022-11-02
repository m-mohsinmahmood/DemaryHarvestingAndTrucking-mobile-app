import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KartOperatorTasksPage } from './kart-operator-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: KartOperatorTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KartOperatorTasksPageRoutingModule {}
