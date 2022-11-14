import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

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
      // {
      //   path: 'home',
      //   loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      // },
      {
        path: 'calendar',
        loadChildren: () => import ('../calendar/calendar.module').then(m => m.CalendarPageModule)
      },
      {
        path: 'people',
        loadChildren: () => import ('../people/people.module').then(m => m.PeoplePageModule)
      },
      {
        path: 'map',
        loadChildren: () => import ('../map/map.module').then(m => m.MapPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import ('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import ('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
