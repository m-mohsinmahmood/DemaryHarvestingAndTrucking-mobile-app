import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrailerPage } from './trailer.page';

const routes: Routes = [
  {
    path: '',
    component: TrailerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrailerPageRoutingModule {}
