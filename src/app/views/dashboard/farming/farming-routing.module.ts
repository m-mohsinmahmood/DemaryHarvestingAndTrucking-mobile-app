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
  },  {
    path: 'ticket-generated',
    loadChildren: () => import('./ticket-generated/ticket-generated.module').then( m => m.TicketGeneratedPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmingPageRoutingModule {}
