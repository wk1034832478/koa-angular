import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as G2 from '@antv/g2';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit, AfterViewInit {
  _data: {type: string, value: number}[];
  @Input()
  title: string;
  _elementId: string;
  constructor() { }

  ngOnInit() {}
  ngAfterViewInit() {
    this.draw();
  }
  /**
   * 通过setter方法对父组建进行监听
   */
  @Input()
  set data( data ) {
    this._data = data;
  }

  @Input()
  set elementId( elementId ) {
    this._elementId = elementId;
  }

  get elementId(  ) {
    return this._elementId;
  }

  draw() {
    const chart = new G2.Chart({
      container: this._elementId,
      forceFit: true,
      height: 300,
      padding: 'auto'
    });
    chart.source(this._data);
    chart.legend(false);
    chart.facet('rect', {
      fields: ['type'],
      padding: 20,
      showTitle: false,
      eachView: function eachView(view, facet) {
        const data = facet.data;
        let color = void 0;
        if (data[0].type === data[0].type) {
          color = '#0a9afe';
        } else {
          color = '#f0657d';
        }
        data.push({
          type: '其他',
          value: 100 - data[0].value
        });
        view.source(data);
        view.coord('theta', {
          radius: 0.8,
          innerRadius: 0.5
        });
        view.intervalStack().position('value').color('type', [color, '#eceef1']).opacity(1);
        view.guide().html({
          position: ['50%', '50%'],
          html:
          '<div class="g2-guide-html"><p class="title">' + data[0].type + '</p><p class="value">' + (data[0].value + '%') + '</p></div>'
        });
      }
    });
    chart.render();
  }
}
