import { Component, Input, AfterViewInit } from '@angular/core';
import * as G2 from '@antv/g2';
import { BarGraphData } from './bar-graph.data';
@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements AfterViewInit {
  _barGraphData: BarGraphData;
  constructor() { }
  ngAfterViewInit() {
    this.draw();
  }
  @Input()
  set barGraphData( barGraphData ) {
    this._barGraphData = barGraphData;
  }
  get barGraphData() {
    return this._barGraphData;
  }
  draw() {
    const data = this.barGraphData.data;
    const imageMap = this.barGraphData.imageMap;
    const chart = new G2.Chart({
      container: this.barGraphData.containerId,
      forceFit: true,
      height: 300,
      padding: [60, 20, 40, 60]
    });
    chart.source(data, {
      vote: {
        min: 0
      }
    });
    chart.legend(false);
    chart.axis('vote', true);
    chart.interval().position('name*vote').color('name', ['#7f8da9', '#fec514', '#db4c3c', '#daf0fd']);
    chart.point().position('name*vote').size(60).shape('name', function(name) {
      return ['image', imageMap[name]];
    });
    chart.render();
  }

}
