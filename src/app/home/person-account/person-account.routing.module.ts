import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonAccountComponent } from './main/person-account.component';
import { SearchComponent } from './search/search.component';
import { AddComponent } from './add/add.component';
import { CanDeactivateGuard } from 'src/app/auth/can-deactivate.guard';
const routes: Routes = [
    {
      path: 'main',
      component: PersonAccountComponent,
    },
    {
      path: 'search',
      component: SearchComponent,
    },
    {
      path: 'add',
      component: AddComponent,
    },
    {
      path: '',
      component: PersonAccountComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonAccountRoutingModule { }
