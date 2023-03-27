import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuspensionBrakesPage } from './suspension-brakes.page';

const routes: Routes = [
  {
    path: '',
    component: SuspensionBrakesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuspensionBrakesPageRoutingModule {}
