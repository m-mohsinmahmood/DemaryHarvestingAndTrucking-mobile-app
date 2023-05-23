import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignRolesPage } from './assign-roles.page';

const routes: Routes = [
  {
    path: '',
    component: AssignRolesPage
  },  {
    path: 'view-details',
    loadChildren: () => import('./view-details/view-details.module').then( m => m.ViewDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignRolesPageRoutingModule {}
