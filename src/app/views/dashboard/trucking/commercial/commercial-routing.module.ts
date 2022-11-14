import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommercialPage } from './commercial.page';

const routes: Routes = [
  {
    path: '',
    component: CommercialPage
  },
  {
    path: 'create-ticket',
    loadChildren: () => import('./create-ticket/create-ticket.module').then( m => m.CreateTicketPageModule)
  },
  {
    path: 'verify-ticket',
    loadChildren: () => import('./verify-ticket/verify-ticket.module').then( m => m.VerifyTicketPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommercialPageRoutingModule {}
