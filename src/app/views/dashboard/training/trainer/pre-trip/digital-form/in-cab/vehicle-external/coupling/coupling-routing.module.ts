import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouplingPage } from './coupling.page';

const routes: Routes = [
  {
    path: '',
    component: CouplingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouplingPageRoutingModule {}
