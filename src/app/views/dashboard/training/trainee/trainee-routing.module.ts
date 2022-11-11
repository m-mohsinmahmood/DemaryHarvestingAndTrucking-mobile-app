import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TraineePage } from './trainee.page';

const routes: Routes = [
  {
    path: '',
    component: TraineePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraineePageRoutingModule {}
