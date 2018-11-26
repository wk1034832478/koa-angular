import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegerationComponent } from './integeration/integeration.component';
import { MainComponent } from './main/main.component';
import { UpdateComponent } from './update/update.component';
const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'update',
    component: UpdateComponent,
},
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicInfoRoutingModule { }
