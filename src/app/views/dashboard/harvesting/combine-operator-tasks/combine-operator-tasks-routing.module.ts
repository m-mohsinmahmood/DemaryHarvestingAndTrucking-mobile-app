import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CombineOperatorTasksPage } from './combine-operator-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: CombineOperatorTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CombineOperatorTasksPageRoutingModule {}
