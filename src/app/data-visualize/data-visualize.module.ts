import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataVisualRoutingModule } from './data-visualize.routing.module';
import { PieComponent } from './pie/pie.component';
import * as G2 from '@antv/g2';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { RegionGraphComponent } from './region-graph/region-graph.component';
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
    CommonModule,
    DataVisualRoutingModule
  ]
})
export class DataVisualizeModule { }
