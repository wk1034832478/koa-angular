import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HometownComponent } from './hometown/hometown.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'hometown',
    component: HometownComponent,
    children: [
      {
        path: 'basic-info',
        loadChildren: './basic-info/basic-info.module#BasicInfoModule'
      },
      {
        path: 'person-account',
        loadChildren: './person-account/person-account.module#PersonAccountModule'
      },
      {
        path: 'salary',
        loadChildren: './salary/salary.module#SalaryModule'
      },
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: '',
        component: MainComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'hometown',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
