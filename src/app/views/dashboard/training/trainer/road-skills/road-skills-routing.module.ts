import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoadSkillsPage } from './road-skills.page';

const routes: Routes = [
  {
    path: '',
    component: RoadSkillsPage
  },
  {
    path: 'evaluation-form',
    loadChildren: () => import('./evaluation-form/evaluation-form.module').then( m => m.EvaluationFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class RoadSkillsPageRoutingModule {}
