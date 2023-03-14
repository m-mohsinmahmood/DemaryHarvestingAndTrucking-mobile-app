import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobSetupPage } from './job-setup.page';

const routes: Routes = [
  {
    path: '',
    component: JobSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobSetupPageRoutingModule {}
