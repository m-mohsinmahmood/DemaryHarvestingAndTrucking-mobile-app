import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTicketPage } from './create-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTicketPage
  },  {
    path: 'ticket-generated',
    loadChildren: () => import('./ticket-generated/ticket-generated.module').then( m => m.TicketGeneratedPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTicketPageRoutingModule { }
