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
    path: 'close-out-order',
    loadChildren: () => import('./close-out-order/close-out-order.module').then(m => m.CloseOutOrderPageModule)
  },
  {
    path: 'submit-end-day',
    loadChildren: () => import('./submit-end-day/submit-end-day.module').then(m => m.SubmitEndDayPageModule)
  },
  {
    path: 'submit-beginning-day',
    loadChildren: () => import('./submit-beginning-day/submit-beginning-day.module').then(m => m.SubmitBeginningDayPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmingPageRoutingModule { }
