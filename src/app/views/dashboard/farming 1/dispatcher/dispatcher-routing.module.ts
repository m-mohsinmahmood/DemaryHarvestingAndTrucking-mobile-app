import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispatcherPage } from './dispatcher.page';

const routes: Routes = [
  {
    path: '',
    component: DispatcherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispatcherPageRoutingModule {}
