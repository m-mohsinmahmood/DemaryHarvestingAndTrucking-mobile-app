import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreCheckFormDetailPage } from './pre-check-form-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PreCheckFormDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreCheckFormDetailPageRoutingModule {}
