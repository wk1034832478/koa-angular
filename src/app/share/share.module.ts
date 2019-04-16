import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms'; // 响应式表单
import { FormsModule } from '@angular/forms';
/**
 * 为所有模块提供公共模块
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ShareModule { }
