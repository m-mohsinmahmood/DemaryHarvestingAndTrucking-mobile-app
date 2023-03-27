import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketGeneratedPage } from './ticket-generated.page';

const routes: Routes = [
  {
    path: '',
    component: TicketGeneratedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketGeneratedPageRoutingModule { }
