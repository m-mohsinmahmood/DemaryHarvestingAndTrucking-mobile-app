import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartCombiningPage } from './start-combining.page';

const routes: Routes = [
  {
    path: '',
    component: StartCombiningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartCombiningPageRoutingModule {}
