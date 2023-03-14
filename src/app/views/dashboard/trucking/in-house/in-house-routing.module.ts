import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompletePreCheckFormPage } from 'src/app/pages/complete-pre-check-form/complete-pre-check-form.page';

import { InHousePage } from './in-house.page';

const routes: Routes = [
  {
    path: '',
    component: InHousePage
  },
  {
    path: 'create-ticket',
    loadChildren: () => import('./create-ticket/create-ticket.module').then(m => m.CreateTicketPageModule)
  },
  {
    path: 'verify-ticket',
    loadChildren: () => import('./verify-ticket/verify-ticket.module').then(m => m.VerifyTicketPageModule)
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
export class InHousePageRoutingModule { }
