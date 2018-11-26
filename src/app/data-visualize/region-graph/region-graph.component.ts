import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as G2 from '@antv/g2';
import { View } from '@antv/data-set';

@Component({
  selector: 'app-region-graph',
  templateUrl: './region-graph.component.html',
  styleUrls: ['./region-graph.component.css']
})
export class RegionGraphComponent implements OnInit, AfterViewInit {

  @Input()
  formatter: Function;
  _data: any[];
  @Input()
  fields: string[];
  @Input()
  column: string;
  @Input()
  dataTitle: string;
  hasPainted: boolean;
  chart: G2.Chart;
  state: string;
  constructor() { }

  ngOnInit() {
    console.log( '获取数据源' );
    console.log( `column ${this.column}` );
    console.log( `formatter ${this.formatter}` );
    console.log( `data ${this.data}` );
    console.log( `fields ${this.fields}` );
  }

  ngAfterViewInit() {
    this.render();
  }

  render() {
    this.state = 'start';
    this.hasPainted = true;

    const dv = new View( ).source( this.data );
    dv.transform({
      type: 'fold',
      fields: this.fields, // 字段值，每个字段是一条线
      key: 'type',
      value: 'value'
    });
    this.chart = new G2.Chart({
      container: 'mountNode',
      forceFit: true,
      height: 600
    });
    const scaleConfig = { };
    scaleConfig[ 'value' ] = { // 缩放配置
      alias: 'Random Name',
      formatter: this.formatter ? this.formatter : this.defaultFormatter // 值格式化
    };
    scaleConfig[ `${this.column}` ] = {
      range: [0, 1]
    };
    this.chart.source(dv, scaleConfig);
    this.chart.tooltip( true );
    this.chart.area().position(`${this.column}*value`).color('type').shape('smooth');
    this.chart.line().position(`${this.column}*value`).color('type').size(2).shape('smooth'); // ${this.column}*
    this.chart.render();
  }

  defaultFormatter ( value ) {
    return value;
  }

  @Input()
  set data( value ) {
    this._data = value;
    if ( this.hasPainted ) {
        this.chart.changeData( this._data );
    }
  }

  get data(  ) {
    return this._data;
  }
}
