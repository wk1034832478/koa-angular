import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/services/salary.service';
import { ApplicationManage } from 'src/app/services/application.manage';
import { ResponseCode } from 'src/app/response/ResponseCode';
import { TipService } from 'src/app/services/tip.service';
import { Salary } from 'src/app/entity/Salary';
import { DateService } from 'src/app/services/date.service';
import { LoggerService } from 'src/app/services/logger.service';
@Component({
  selector: 'app-salary-data-visual',
  templateUrl: './salary-data-visual.component.html',
  styleUrls: ['./salary-data-visual.component.css']
})
export class SalaryDataVisualComponent implements OnInit {
  title = '薪资可视化组件';
  dataTitle = '工资报表';
  data: any[];
  fields: string[];
  column: string;
  regex = /([0-9]{4})\\-([0-9]{1,2})/g;
  isLoading: boolean;
  constructor(private salaryService: SalaryService, private applicationManage: ApplicationManage,
    private tipService: TipService, private dateService: DateService, private loggerService: LoggerService) { }

  ngOnInit() {
    this.column = 'time';
    this.loadSalary();
  }

  loadSalary() {
      this.isLoading = true;
      this.salaryService.findAllSalary( this.applicationManage._account.id ).then(
      res => {
        this.isLoading = false;
        if ( res.code === ResponseCode.SUCCESS) {
          // 开始加载数据
          try {
            this.loadData( res.object );
          } catch ( e ) {
            this.loggerService.log( this, `解析错误：${e}`);
          }
        } else {
          this.tipService.tip( res.msg );
        }
      }
    ).catch(
      () => {
        this.isLoading = false;
        this.loggerService.log( this, `数据加载失败！`);
        this.tipService.tip( `网络故障！`);
      }
    );
  }


  formatter( value ) {
    return `￥${value}`;
  }

  loadData( salaries:  Salary[] ) {
    this.data = [];
    this.fields = [];
    for (let i = 0; i < salaries.length; i++) {
      const salary: Salary = salaries[i];
      salary.deliverDate = this.dateService.convertDate( salary.deliverDate );
      // 加载 fields
      if ( i === 0 ) {
        this.fields.push( salary.workCompany.name );
      } else {
        for ( let j = 0; j < this.fields.length; j++) {
          if ( this.fields[j] === salary.workCompany.name ) {
            break;
          }
          if ( j === this.fields.length - 1) {
            this.fields.push( salary.workCompany.name );
          }
        }
      }
      // 加载 fields 结束
      let data;
      if ( this.data.length === 0 ) { // 第一次添加数据
        data = {};
        data[ 'time' ] = this.getDateToken( salary.deliverDate ) ; // 时间
        data[ salary.workCompany.name ] = salary.mount ; // 薪资
        this.data.push( data );
        continue;
      } else { // 遍历已经添加的数据
        for ( let j = 0; j < this.data.length; j++) {
          if ( this.data[j]['time'] === this.getDateToken( salary.deliverDate ) ) { // 比较时间token，如果存在，则存在该时间的薪资情况
            this.data[j][ salary.workCompany.name ] = salary.mount;
            break;
          }
          if ( j === this.data.length - 1 ) { // 不存在该时间的薪资情况，新创建
            data = {};
            data['time'] = this.getDateToken( salary.deliverDate );
            data[ salary.workCompany.name ] = salary.mount ;
            this.data.push( data );
          }
        }
      }
    }
  }

  sort( date1: string, date2: string ) {
    this.regex.test( date1 );
    const year1 = RegExp.$1;
    const month1 = RegExp.$2;
    this.regex.test( date2 );
    const year2 = RegExp.$1;
    const month2 = RegExp.$2;
    if ( year1 !== year2 ) {
      return year1 <= year2 ? 1 : -1;
    }
    return month1 <= month2 ? 1 : -1;
  }

  getDateToken( date: Date ): string {
    return date.getFullYear() + '-' + ( date.getMonth() + 1 ) ; // 月份是从0开始的
  }
}
