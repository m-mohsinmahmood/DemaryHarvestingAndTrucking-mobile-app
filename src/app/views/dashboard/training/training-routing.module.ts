import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingPage } from './training.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingPage
  },
  {
    path: 'trainee',
    loadChildren: () => import('./trainee/trainee.module').then( m => m.TraineePageModule)
  },
  {
    path: 'trainer',
    loadChildren: () => import('./trainer/trainer.module').then( m => m.TrainerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPageRoutingModule {}
