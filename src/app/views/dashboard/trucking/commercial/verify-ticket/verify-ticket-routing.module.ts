import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyTicketPage } from './verify-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyTicketPage
  },
  {
    path: 'ticket-detail',
    loadChildren: () => import('./ticket-detail/ticket-detail.module').then( m => m.TicketDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyTicketPageRoutingModule {}
