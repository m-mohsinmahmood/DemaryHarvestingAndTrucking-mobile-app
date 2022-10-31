import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloseDailyCombiningPage } from './close-daily-combining.page';

const routes: Routes = [
  {
    path: '',
    component: CloseDailyCombiningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloseDailyCombiningPageRoutingModule {}
