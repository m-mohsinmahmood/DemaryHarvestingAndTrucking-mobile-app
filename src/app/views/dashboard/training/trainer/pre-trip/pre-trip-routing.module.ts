import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreTripPage } from './pre-trip.page';

const routes: Routes = [
  {
    path: '',
    component: PreTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreTripPageRoutingModule {}
