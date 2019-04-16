import { NgModule } from '@angular/core';
import { SalaryRoutingModule } from './salary.routing.module';
import { MainComponent } from './main/main.component';
import { DataVisualizeModule } from 'src/app/data-visualize/data-visualize.module';
import { SalaryDataVisualComponent } from './salary-data-visual/salary-data-visual.component';
import { WorkCompanyComponent } from './work-company/work-company.component';
import { ShareModule } from '../../share/share.module';
import { SalaryService } from './services/salary.service';
@NgModule({
  declarations: [
    MainComponent,
    WorkCompanyComponent,
    SalaryDataVisualComponent,
  ],
  imports: [
    DataVisualizeModule,
    SalaryRoutingModule,
    ShareModule
  ],
  providers: [
    SalaryService
  ]
})
export class SalaryModule { }
