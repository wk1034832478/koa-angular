import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicInfoRoutingModule } from './basic-info.routing.module';
import { IntegerationComponent } from './integeration/integeration.component';
import { MainComponent } from './main/main.component';
import { UpdateComponent } from './update/update.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // 响应式表单
import { NgZorroAntdModule } from 'ng-zorro-antd';
@NgModule({
  declarations: [
    IntegerationComponent,
    MainComponent,
    UpdateComponent,
  ],
  imports: [
    CommonModule,
    BasicInfoRoutingModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
  ]
})
export class BasicInfoModule { }
