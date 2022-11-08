import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignRolesPage } from './assign-roles.page';

const routes: Routes = [
  {
    path: '',
    component: AssignRolesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignRolesPageRoutingModule {}
