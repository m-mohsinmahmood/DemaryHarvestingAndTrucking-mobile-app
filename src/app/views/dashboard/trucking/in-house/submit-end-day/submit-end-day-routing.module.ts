import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitEndDayPage } from './submit-end-day.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitEndDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitEndDayPageRoutingModule {}
