import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportEquipIssuePage } from './report-equip-issue.page';

const routes: Routes = [
  {
    path: '',
    component: ReportEquipIssuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportEquipIssuePageRoutingModule {}
