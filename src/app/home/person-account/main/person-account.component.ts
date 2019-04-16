import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/entity/Page';
import { LoggerService } from 'src/app/services/logger.service';
import { PersonAccount } from 'src/app/entity/PersonAccount';
import { PersonAccountService } from 'src/app/home/person-account/services/person.account.service';
import { ApplicationManage } from 'src/app/services/application.manage';
import { ResponseCode } from 'src/app/response/ResponseCode';
import { TipService } from 'src/app/services/tip.service';
import { BarGraphData } from 'src/app/data-visualize/bar-graph/bar-graph.data';
import { AccountDistribution } from 'src/app/entity/AccountDistribution';

@Component({
  selector: 'app-person-account',
  templateUrl: './person-account.component.html',
  styleUrls: ['./person-account.component.css']
})
export class PersonAccountComponent implements OnInit {
  title: '个人账户组件';
  page: Page;
  personAccounts: PersonAccount[];
  accountUsePercent: { type: string, value: number}[ ];
  accountDistribution: BarGraphData;
  isAccountSearch: boolean;
  constructor(private loggerService: LoggerService,
    private personAccountService: PersonAccountService, private applicationManage: ApplicationManage,
    private tip: TipService) { }

  ngOnInit() {
    this.loadAccountCanUsePercent();
    this.loadAccountDistribution();
  }

  onPageUpdate(  data: { page?: Page, data?: PersonAccount[], isLoading: boolean } ) {
    this.page = data.page;
    this.personAccounts = data.data;
    this.isAccountSearch = data.isLoading;
  }
  onsearch( isLoading ) {
    this.isAccountSearch = isLoading;
  }
  /**
   * 加载账户使用率
   */
  loadAccountCanUsePercent() {
    this.personAccountService.canUsePercent( this.applicationManage._account.id).then( res => {
      if ( res.code === ResponseCode.SUCCESS ) {
        if ( !res.object || res.object === [] ) {
          // return this.tip.tip( '你还没有保存任何账号咯！' );
          return ;
        }
        this.applicationManage._usePercent.accountCanUse = +( (Number.parseFloat(res.object.toString()) * 100 ).toFixed(2) );
        this.applicationManage._usePercent.accountNonCanUse =  +(100 - this.applicationManage._usePercent.accountCanUse ).toFixed(2);
        this.accountUsePercent = [];
        this.accountUsePercent.push( { type: '可用', value: this.applicationManage._usePercent.accountCanUse} );
        this.accountUsePercent.push( { type: '不可用', value: this.applicationManage._usePercent.accountNonCanUse} );
      }
    }).catch( () => {
        this.tip.tip( '网络错误！请检查网络或重新登陆后再次尝试' );
    });
  }

  /**
   * 加载用户账户分布情况
   */
  loadAccountDistribution() {
    this.personAccountService.accountDistribution( this.applicationManage._account.id).then( res => {
      if ( res.code === ResponseCode.SUCCESS ) {
        const accountDistribution: AccountDistribution[] = [];
        const dis: string[][] = res.object;
        const data = [];
        for ( let i = 0; i < dis.length; i++) {
          accountDistribution.push( { number: +dis[i][0],  typeId: dis[i][1], typeName: dis[i][2] } );
          data.push( { vote: +dis[i][0],  name: dis[i][2] } );
        }
        this.applicationManage._accountDistribution = accountDistribution;
        this.accountDistribution = {
          data: data,
          title: '账户类型分布',
          containerId: 'accountDistribution',
          imageMap: {}
        };
      } else if ( res.code === ResponseCode.LOST ) {
        this.tip.tip( '你还没有保存任何账号咯！' );
      }
    }).catch( () => {
        this.tip.tip( '网络错误！请检查网络或重新登陆后再次尝试' );
    });
  }
}
