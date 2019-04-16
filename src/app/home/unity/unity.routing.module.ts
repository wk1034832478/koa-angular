import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UploadComponent } from './upload/upload.component';
const routes: Routes = [
    {
        path: 'main',
        component: MainComponent
    },
    {
        path: 'dashboard',
        component: MainComponent
    },
    {
        path: 'upload',
        component: UploadComponent
    },
    {
        path: '',
        component: MainComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class UnityRoutingModule { }
