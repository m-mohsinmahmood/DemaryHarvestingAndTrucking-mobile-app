import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ProfilePageModule } from './../profile/profile.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import ('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import ('../profile/profile.module').then(m => m.ProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class TabsPageRoutingModule {}
