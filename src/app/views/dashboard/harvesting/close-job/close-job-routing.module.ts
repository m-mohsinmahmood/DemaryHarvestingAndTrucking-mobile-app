import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloseJobPage } from './close-job.page';

const routes: Routes = [
  {
    path: '',
    component: CloseJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloseJobPageRoutingModule {}
