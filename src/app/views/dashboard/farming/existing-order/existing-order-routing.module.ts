import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExistingOrderPage } from './existing-order.page';

const routes: Routes = [
  {
    path: '',
    component: ExistingOrderPage
  },
  {
    path: 'complete-existing-order',
    loadChildren: () => import('./complete-existing-order/complete-existing-order.module').then(m => m.CompleteExistingOrderPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingOrderPageRoutingModule { }
