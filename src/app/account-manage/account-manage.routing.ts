import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistryComponent } from './registry/registry.component';


const routes: Routes = [
  {
    path: '',
    component: RegistryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class AccountManageRoutingModule { }
