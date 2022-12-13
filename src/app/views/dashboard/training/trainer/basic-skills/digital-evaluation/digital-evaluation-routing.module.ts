import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigitalEvaluationPage } from './digital-evaluation.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalEvaluationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalEvaluationPageRoutingModule {}
