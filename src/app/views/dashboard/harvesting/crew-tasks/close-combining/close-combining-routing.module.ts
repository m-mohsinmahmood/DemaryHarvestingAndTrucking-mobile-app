import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloseCombiningPage } from './close-combining.page';

const routes: Routes = [
  {
    path: '',
    component: CloseCombiningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloseCombiningPageRoutingModule {}
