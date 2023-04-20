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
  },  {
    path: 'alley-docking90',
    loadChildren: () => import('./alley-docking90/alley-docking90.module').then( m => m.AlleyDocking90PageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlleyDockingPageRoutingModule {}
