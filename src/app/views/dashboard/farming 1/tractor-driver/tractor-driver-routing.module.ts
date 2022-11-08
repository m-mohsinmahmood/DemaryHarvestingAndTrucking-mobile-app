import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreCheckPage } from './pre-check.page';

const routes: Routes = [
  {
    path: '',
    component: PreCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreCheckPageRoutingModule {}
