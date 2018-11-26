import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonAccountRoutingModule } from './person-account.routing.module';
import { PersonAccountComponent } from './main/person-account.component';
import { SearchComponent } from './search/search.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms'; // 响应式表单
import { FormsModule } from '@angular/forms';
import { AccountListComponent } from './account-list/account-list.component';
import { DataVisualizeModule } from 'src/app/data-visualize/data-visualize.module';
import { AddComponent } from './add/add.component';
@NgModule({
  declarations: [
    PersonAccountComponent,
    SearchComponent,
    AccountListComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    PersonAccountRoutingModule,
    DataVisualizeModule
  ],
  providers: []
})
export class PersonAccountModule { }
