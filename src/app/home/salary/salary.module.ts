import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryRoutingModule } from './salary.routing.module';
import { MainComponent } from './main/main.component';
import { DataVisualizeModule } from 'src/app/data-visualize/data-visualize.module';
import { SalaryDataVisualComponent } from './salary-data-visual/salary-data-visual.component';
import { WorkCompanyComponent } from './work-company/work-company.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // 响应式表单
@NgModule({
  declarations: [
    MainComponent,
    WorkCompanyComponent,
    SalaryDataVisualComponent,
  ],
  imports: [
    CommonModule,
    DataVisualizeModule,
    SalaryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ]
})
export class SalaryModule { }
