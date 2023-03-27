import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicSkillsPage } from './basic-skills.page';

const routes: Routes = [
  {
    path: '',
    component: BasicSkillsPage
  },  {
    path: 'digital-evaluation',
    loadChildren: () => import('./digital-evaluation/digital-evaluation.module').then( m => m.DigitalEvaluationPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicSkillsPageRoutingModule {}
