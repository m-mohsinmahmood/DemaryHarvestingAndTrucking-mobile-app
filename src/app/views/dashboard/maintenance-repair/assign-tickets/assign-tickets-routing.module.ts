import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignTicketsPage } from './assign-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: AssignTicketsPage
  },
  {
    path: 'ticket-assigned-to',
    loadChildren: () => import('./ticket-assigned-to/ticket-assigned-to.module').then( m => m.TicketAssignedToPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignTicketsPageRoutingModule {}
