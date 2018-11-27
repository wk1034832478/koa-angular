import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './basic/basic.component';


const routes: Routes = [
    {
        path: 'basic',
        component: BasicComponent // 具有富文本编辑器的基本特征
    },
    {
        path: '',
        component: BasicComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RichTextRoutingModule { }
