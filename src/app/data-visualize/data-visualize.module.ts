import { NgModule } from '@angular/core';
import { DataVisualRoutingModule } from './data-visualize.routing.module';
import { PieComponent } from './pie/pie.component';
import * as G2 from '@antv/g2';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { RegionGraphComponent } from './region-graph/region-graph.component';
import { ShareModule } from '../share/share.module';
G2.track( false ); // 关闭用户体验追踪
@NgModule({
  declarations: [
    PieComponent,
    BarGraphComponent,
    RegionGraphComponent
  ],
  exports: [
    PieComponent,
    BarGraphComponent,
    RegionGraphComponent
  ],
  imports: [
    ShareModule,
    DataVisualRoutingModule
  ]
})
export class DataVisualizeModule { }
