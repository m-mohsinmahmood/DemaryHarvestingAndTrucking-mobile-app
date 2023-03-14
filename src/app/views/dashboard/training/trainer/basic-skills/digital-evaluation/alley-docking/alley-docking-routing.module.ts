import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlleyDockingPage } from './alley-docking.page';

const routes: Routes = [
  {
    path: '',
    component: AlleyDockingPage
  },
  {
    path: 'off-set-backing',
    loadChildren: () => import('./off-set-backing/off-set-backing.module').then( m => m.OffSetBackingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlleyDockingPageRoutingModule {}
