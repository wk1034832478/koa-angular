import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PlaygroundComponent } from './playground/playground.component';

const routes: Routes = [
    {
        path: '',
        component: PlaygroundComponent
    },
    {
        path: 'playground',
        component: PlaygroundComponent
    },
    {
        path: 'main',
        component: MainComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class SocialContactRoutingModule { }
