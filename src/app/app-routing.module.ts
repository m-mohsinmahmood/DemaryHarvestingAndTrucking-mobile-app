/* eslint-disable max-len */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectAuthorizedToHome = () => {
  return redirectLoggedInTo(['tabs']);
};

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/login/login.module').then((m) => m.LoginPageModule),
    ...canActivate(redirectAuthorizedToHome),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./views/tabs/tabs.module').then((m) => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'complete-pre-check-form',
    loadChildren: () =>
      import(
        './pages/complete-pre-check-form/complete-pre-check-form.module'
      ).then((m) => m.CompletePreCheckFormPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
