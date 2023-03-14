import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceRepairPage } from './maintenance-repair.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceRepairPage
  },
  {
    path: 'report-equip-issue',
    loadChildren: () => import('./report-equip-issue/report-equip-issue.module').then(m => m.ReportEquipIssuePageModule)
  },
  {
    path: 'assign-tickets',
    loadChildren: () => import('./assign-tickets/assign-tickets.module').then(m => m.AssignTicketsPageModule)
  },
  {
    path: 'create-repair-or-maintenance',
    loadChildren: () => import('./create-repair-or-maintenance/create-repair-or-maintenance.module').then( m => m.CreateRepairORMaintenancePageModule)
  },
  {
    path: 'complete-existing-ticket',
    loadChildren: () => import('./complete-existing-ticket/complete-existing-ticket.module').then( m => m.CompleteExistingTicketPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRepairPageRoutingModule { }
