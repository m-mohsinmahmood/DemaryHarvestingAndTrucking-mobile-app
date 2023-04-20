import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlleyDocking90Page } from './alley-docking90.page';

const routes: Routes = [
  {
    path: '',
    component: AlleyDocking90Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlleyDocking90PageRoutingModule {}
