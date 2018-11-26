import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationManage } from 'src/app/services/application.manage';
interface Item {
    title?: string;
    status?: string;
    completed?: boolean;
}
@Component({
  selector: 'app-integeration',
  templateUrl: './integeration.component.html',
  styleUrls: ['./integeration.component.css']
})
export class IntegerationComponent implements OnInit  {
  items: Item[] = [];
  current: number; // 从1开始
  id: any;
  constructor(private applicationManage: ApplicationManage) { }

  ngOnInit() {
    this.initItem();
  }
  initItem () {
    let token: boolean;

    token = this.applicationManage._account ? true : false;
    const itme_account: Item = { title: '账号注册', status: token ? '已注册' : '还未注册',
     completed: token !== null };

    token = this.applicationManage._basicInfo ? true : false;
    const itme_basicinfo: Item = { title: '信息完善', status: token ? '已完善' : '还未完善',
    completed: token ? true : false  };

    token = ( token  && this.applicationManage._basicInfo.photo ? true : false );
    const item_basicinfo_photo = { title: '头像上传',
    status: token ? '已上传' : '还未上传',
    completed: token ? true : false};

    this.items = [itme_account, itme_basicinfo, item_basicinfo_photo];
    this.items.forEach( (v, i) => {
      if ( v.completed ) {this.current = i; }
    });
  }

}
