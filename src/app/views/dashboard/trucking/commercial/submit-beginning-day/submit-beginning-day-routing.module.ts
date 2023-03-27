import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitBeginningDayPage } from './submit-beginning-day.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitBeginningDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitBeginningDayPageRoutingModule {}
