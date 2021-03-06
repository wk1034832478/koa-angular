import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserAuthGuardGuard } from './auth/user-auth-guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [UserAuthGuardGuard], // 开发期间关闭该守卫
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [UserAuthGuardGuard], // 开发期间关闭该守卫
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'account-manage',
    loadChildren: './account-manage/account-manage.module#AccountManageModule'
  },
  {
    path: 'welcome',
    loadChildren:  './welcome/welcome.module#WelcomeModule'
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
