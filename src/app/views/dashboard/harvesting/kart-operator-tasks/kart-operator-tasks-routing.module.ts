import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KartOperatorTasksPage } from './kart-operator-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: KartOperatorTasksPage
  },
  {
    path: 'start-combining',
    loadChildren: () => import('./start-combining/start-combining.module').then( m => m.StartCombiningPageModule)
  },
  {
    path: 'change-field',
    loadChildren: () => import('./change-field/change-field.module').then( m => m.ChangeFieldPageModule)
  },
  {
    path: 'close-combining',
    loadChildren: () => import('./close-combining/close-combining.module').then( m => m.CloseCombiningPageModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then( m => m.TicketsPageModule)
  },
  {
    path: 'verify-tickets',
    loadChildren: () => import('./verify-tickets/verify-tickets.module').then( m => m.VerifyTicketsPageModule)
  },
  {
    path: 'reassign-tickets',
    loadChildren: () => import('./reassign-tickets/reassign-tickets.module').then( m => m.ReassignTicketsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KartOperatorTasksPageRoutingModule {}
