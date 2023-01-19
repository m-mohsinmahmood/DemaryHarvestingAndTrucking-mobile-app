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
  },  {
    path: 'submit-beginning-day',
    loadChildren: () => import('./submit-beginning-day/submit-beginning-day.module').then( m => m.SubmitBeginningDayPageModule)
  },
  {
    path: 'submit-end-day',
    loadChildren: () => import('./submit-end-day/submit-end-day.module').then( m => m.SubmitEndDayPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommercialPageRoutingModule {}
