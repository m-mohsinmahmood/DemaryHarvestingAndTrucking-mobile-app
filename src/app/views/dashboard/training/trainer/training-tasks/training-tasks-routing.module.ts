import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingTasksPage } from './training-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingTasksPageRoutingModule {}
