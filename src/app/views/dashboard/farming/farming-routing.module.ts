import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmingPage } from './farming.page';

const routes: Routes = [
  {
    path: '',
    component: FarmingPage
  },
  {
    path: 'create-order',
    loadChildren: () => import('./create-order/create-order.module').then( m => m.CreateOrderPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmingPageRoutingModule {}
