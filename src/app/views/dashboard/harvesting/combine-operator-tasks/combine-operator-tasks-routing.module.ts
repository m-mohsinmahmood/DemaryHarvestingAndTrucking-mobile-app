import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CombineOperatorTasksPage } from './combine-operator-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: CombineOperatorTasksPage
  },
  {
    path: 'start-combining',
    loadChildren: () => import('./start-combining/start-combining.module').then( m => m.StartCombiningPageModule)
  },
  {
    path: 'close-combining',
    loadChildren: () => import('./close-combining/close-combining.module').then( m => m.CloseCombiningPageModule)
  },
  {
    path: 'change-field',
    loadChildren: () => import('./change-field/change-field.module').then( m => m.ChangeFieldPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CombineOperatorTasksPageRoutingModule {}
