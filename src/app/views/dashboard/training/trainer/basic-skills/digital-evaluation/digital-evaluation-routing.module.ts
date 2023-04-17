import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigitalEvaluationPage } from './digital-evaluation.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalEvaluationPage
  },
  {
    path: 'alley-docking',
    loadChildren: () => import('./alley-docking/alley-docking.module').then( m => m.AlleyDockingPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalEvaluationPageRoutingModule {}
