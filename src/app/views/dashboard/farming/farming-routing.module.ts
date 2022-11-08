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
    loadChildren: () => import('./create-order/create-order.module').then(m => m.CreateOrderPageModule)
  },
  {
    path: 'ticket-generated',
    loadChildren: () => import('./ticket-generated/ticket-generated.module').then(m => m.TicketGeneratedPageModule)
  },
  {
    path: 'verify-orders',
    loadChildren: () => import('./verify-orders/verify-orders.module').then(m => m.VerifyOrdersPageModule)
  },
  {
    path: 'existing-order',
    loadChildren: () => import('./existing-order/existing-order.module').then(m => m.ExistingOrderPageModule)
  },
  {
    path: 'change-field',
    loadChildren: () => import('./change-field/change-field.module').then( m => m.ChangeFieldPageModule)
  },
  {
    path: 'close-out-order',
    loadChildren: () => import('./close-out-order/close-out-order.module').then( m => m.CloseOutOrderPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmingPageRoutingModule { }
