import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartDailyCombiningPage } from './start-daily-combining.page';

const routes: Routes = [
  {
    path: '',
    component: StartDailyCombiningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartDailyCombiningPageRoutingModule {}
