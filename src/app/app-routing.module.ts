import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserAuthGuardGuard } from './auth/user-auth-guard.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [UserAuthGuardGuard],
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'account-manage',
    loadChildren: './account-manage/account-manage.module#AccountManageModule'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: '',
    redirectTo: '/home', // 重定向到home
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
