import { NgModule } from '@angular/core';
import { PersonAccountRoutingModule } from './person-account.routing.module';
import { PersonAccountComponent } from './main/person-account.component';
import { SearchComponent } from './search/search.component';
import { AccountListComponent } from './account-list/account-list.component';
import { DataVisualizeModule } from 'src/app/data-visualize/data-visualize.module';
import { AddComponent } from './add/add.component';
import { ShareModule } from '../../share/share.module';
import { PersonAccountService } from './services/person.account.service';
@NgModule({
  declarations: [
    PersonAccountComponent,
    SearchComponent,
    AccountListComponent,
    AddComponent,
  ],
  imports: [
    PersonAccountRoutingModule,
    DataVisualizeModule,
    ShareModule
  ],
  providers: [
    PersonAccountService
  ]
})
export class PersonAccountModule { }
