import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloseOutPage } from './close-out.page';

const routes: Routes = [
  {
    path: '',
    component: CloseOutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloseOutPageRoutingModule {}
