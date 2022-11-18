import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainerPage } from './trainer.page';

const routes: Routes = [
  {
    path: '',
    component: TrainerPage
  },
  {
    path: 'pre-trip',
    loadChildren: () => import('./pre-trip/pre-trip.module').then( m => m.PreTripPageModule)
  },  {
    path: 'basic-skills',
    loadChildren: () => import('./basic-skills/basic-skills.module').then( m => m.BasicSkillsPageModule)
  },
  {
    path: 'road-skills',
    loadChildren: () => import('./road-skills/road-skills.module').then( m => m.RoadSkillsPageModule)
  },
  {
    path: 'training-records',
    loadChildren: () => import('./training-records/training-records.module').then( m => m.TrainingRecordsPageModule)
  },
  {
    path: 'training-tasks',
    loadChildren: () => import('./training-tasks/training-tasks.module').then( m => m.TrainingTasksPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainerPageRoutingModule {}
