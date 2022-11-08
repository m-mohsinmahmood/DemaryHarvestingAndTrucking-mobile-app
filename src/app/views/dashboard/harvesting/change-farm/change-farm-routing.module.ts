import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeFarmPage } from './change-farm.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeFarmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeFarmPageRoutingModule {}
