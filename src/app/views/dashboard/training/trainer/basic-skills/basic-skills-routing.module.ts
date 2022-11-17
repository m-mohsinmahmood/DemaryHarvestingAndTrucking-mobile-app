import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicSkillsPage } from './basic-skills.page';

const routes: Routes = [
  {
    path: '',
    component: BasicSkillsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicSkillsPageRoutingModule {}
