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
    path: 'change-farm-crop',
    loadChildren: () => import('./change-farm-crop/change-farm-crop.module').then( m => m.ChangeFarmCropPageModule)
  },
  {
    path: 'start-daily-combining',
    loadChildren: () => import('./start-daily-combining/start-daily-combining.module').then( m => m.StartDailyCombiningPageModule)
  },
  {
    path: 'change-field',
    loadChildren: () => import('./change-field/change-field.module').then( m => m.ChangeFieldPageModule)
  },
  {
    path: 'close-daily-combining',
    loadChildren: () => import('./close-daily-combining/close-daily-combining.module').then( m => m.CloseDailyCombiningPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrewTasksPageRoutingModule {}
