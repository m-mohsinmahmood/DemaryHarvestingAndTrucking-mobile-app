import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRepairORMaintenancePage } from './create-repair-or-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRepairORMaintenancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRepairORMaintenancePageRoutingModule {}
