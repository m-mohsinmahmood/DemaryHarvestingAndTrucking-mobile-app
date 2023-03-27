import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartJobPage } from './start-job.page';

const routes: Routes = [
  {
    path: '',
    component: StartJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartJobPageRoutingModule {}
