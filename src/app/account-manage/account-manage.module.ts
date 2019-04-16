import { NgModule } from '@angular/core';
import { RegistryComponent } from './registry/registry.component';
import { AccountManageRoutingModule } from './account-manage.routing';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    RegistryComponent
  ],
  imports: [
    ShareModule,
    AccountManageRoutingModule
  ]
})
export class AccountManageModule { }
