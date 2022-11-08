import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteExistingOrderPage } from './complete-existing-order.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteExistingOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteExistingOrderPageRoutingModule {}
