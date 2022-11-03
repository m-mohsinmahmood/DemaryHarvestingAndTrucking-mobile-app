import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TractorDriverPage } from './tractor-driver.page';

const routes: Routes = [
  {
    path: '',
    component: TractorDriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TractorDriverPageRoutingModule {}
