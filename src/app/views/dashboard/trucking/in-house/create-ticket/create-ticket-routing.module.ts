import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTicketPage } from './create-ticket.page';
import { InHousePage } from '../in-house.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTicketPage
  },
  {
    path: 'in-house',
    component: InHousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTicketPageRoutingModule { }
