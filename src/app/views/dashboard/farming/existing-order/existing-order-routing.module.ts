import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompleteExistingOrderPage } from '../complete-existing-order/complete-existing-order.page';

import { ExistingOrderPage } from './existing-order.page';

const routes: Routes = [
  {
    path: '',
    component: ExistingOrderPage
  },
  {
    path: 'complete-existing-order',
    component: CompleteExistingOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingOrderPageRoutingModule { }
