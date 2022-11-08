import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloseOutOrderPage } from './close-out-order.page';

const routes: Routes = [
  {
    path: '',
    component: CloseOutOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloseOutOrderPageRoutingModule {}
