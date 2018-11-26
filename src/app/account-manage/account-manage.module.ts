import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry/registry.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // 响应式表单
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AccountManageRoutingModule } from './account-manage.routing';

@NgModule({
  declarations: [
    RegistryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    AccountManageRoutingModule
  ]
})
export class AccountManageModule { }
