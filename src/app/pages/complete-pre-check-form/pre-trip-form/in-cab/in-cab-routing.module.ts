import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InCabPage } from './in-cab.page';

const routes: Routes = [
  {
    path: '',
    component: InCabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InCabPageRoutingModule {}
