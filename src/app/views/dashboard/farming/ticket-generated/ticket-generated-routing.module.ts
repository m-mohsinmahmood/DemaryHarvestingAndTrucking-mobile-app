import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketGeneratedPage } from './ticket-generated.page';
import { FarmingPage } from '../farming.page';

const routes: Routes = [
  {
    path: '',
    component: TicketGeneratedPage
  },

  {
    path: 'farming-main',
    component: FarmingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketGeneratedPageRoutingModule { }
