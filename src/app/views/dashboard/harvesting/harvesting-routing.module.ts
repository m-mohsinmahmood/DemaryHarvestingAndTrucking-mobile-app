import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HarvestingPage } from './harvesting.page';

const routes: Routes = [
  {
    path: '',
    component: HarvestingPage
  },
  {
    path: 'assign-roles',
    loadChildren: () => import('./assign-roles/assign-roles.module').then( m => m.AssignRolesPageModule)
  },
  {
    path: 'start-job',
    loadChildren: () => import('./start-job/start-job.module').then( m => m.StartJobPageModule)
  },
  {
    path: 'close-job',
    loadChildren: () => import('./close-job/close-job.module').then( m => m.CloseJobPageModule)
  },
  {
    path: 'change-field',
    loadChildren: () => import('./change-field/change-field.module').then( m => m.ChangeFieldPageModule)
  },
  {
    path: 'change-farm',
    loadChildren: () => import('./change-farm/change-farm.module').then( m => m.ChangeFarmPageModule)
  },
  {
    path: 'job-setup',
    loadChildren: () => import('./job-setup/job-setup.module').then( m => m.JobSetupPageModule)
  },
  {
    path: 'ticket',
    loadChildren: () => import('./ticket/ticket.module').then( m => m.TicketPageModule)
  },
  {
    path: 'verify-ticket',
    loadChildren: () => import('./verify-ticket/verify-ticket.module').then( m => m.VerifyTicketPageModule)
  },
  {
    path: 'reassign-ticket',
    loadChildren: () => import('./reassign-ticket/reassign-ticket.module').then( m => m.ReassignTicketPageModule)
  },
  {
    path: 'pre-check',
    loadChildren: () => import('./pre-check/pre-check.module').then( m => m.PreCheckPageModule)
  },  {
    path: 'close-out',
    loadChildren: () => import('./close-out/close-out.module').then( m => m.CloseOutPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class HarvestingPageRoutingModule {}
