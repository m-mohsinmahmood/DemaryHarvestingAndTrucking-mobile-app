import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrewTasksPage } from './crew-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: CrewTasksPage
  },
  {
    path: 'job-setup',
    loadChildren: () => import('./job-setup/job-setup.module').then( m => m.JobSetupPageModule)
  },
  {
    path: 'assign-roles',
    loadChildren: () => import('./assign-roles/assign-roles.module').then( m => m.AssignRolesPageModule)
  },
  {
    path: 'change-farm',
    loadChildren: () => import('./change-farm/change-farm.module').then( m => m.ChangeFarmPageModule)
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrewTasksPageRoutingModule {}
