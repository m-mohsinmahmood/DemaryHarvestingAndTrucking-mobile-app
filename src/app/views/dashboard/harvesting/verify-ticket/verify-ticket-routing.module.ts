import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyTicketPage } from './verify-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyTicketPage
  },
  {
    path: 'generated-ticket',
    loadChildren: () => import('./generated-ticket/generated-ticket.module').then( m => m.GeneratedTicketPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyTicketPageRoutingModule {}
