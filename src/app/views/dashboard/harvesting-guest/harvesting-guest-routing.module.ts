import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HarvestingGuestPage } from './harvesting-guest.page';

const routes: Routes = [
  {
    path: '',
    component: HarvestingGuestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HarvestingGuestPageRoutingModule {}
