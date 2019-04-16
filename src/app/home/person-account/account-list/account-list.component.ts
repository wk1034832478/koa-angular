import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Page } from 'src/app/entity/Page';
import { PersonAccount } from 'src/app/entity/PersonAccount';
import { PersonAccountService } from 'src/app/home/person-account/services/person.account.service';
import { ResponseCode } from 'src/app/response/ResponseCode';
import { TipService } from 'src/app/services/tip.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { ApplicationManage } from 'src/app/services/application.manage';
import { BarGraphData } from 'src/app/data-visualize/bar-graph/bar-graph.data';
import { LoggerService } from 'src/app/services/logger.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  title = '账户列表组件';
  @Input()
  page: Page;
  @Input()
  personAccounts: PersonAccount[];
  columns = [  '账号', '密码', '是否可用', '关联手机' , '创建时间', '类型', '编辑' , '修改' ];
  @Input()
  accountUsePercent: { type: string, value: number}[ ];
  accountUsePercentTitle = '账号可用性分析';
  pieElementId = 'pieElementId';
  @Input()
  accountDistribution: BarGraphData;
  @Input()
  isLoading;
  currentPageSize = 10 ; // 当前表格每一页的数据量,默认为10
  currentPageIndex = 1; // 当前表格页索引，默认为1
  tplModal: NzModalRef;
  isEditting: boolean;
  updatingPersonAccount: PersonAccount;
  backupPersonAccount: PersonAccount;
  constructor(private personAccountService: PersonAccountService, private loggerService: LoggerService,
    private tipService: TipService, private modalService: NzModalService, private dateService: DateService,
    private applicationManage: ApplicationManage) { }

  ngOnInit() {}

  preUpdate(personAccount: PersonAccount, tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    if ( typeof( personAccount.createTime )  === 'string' ) {
      this.loggerService.log(this, `字符串时间转化为Date类型`);
      personAccount.createTime = this.dateService.convertDate( personAccount.createTime );
    }
    this.updatingPersonAccount = personAccount;
    this.backupPersonAccount = JSON.parse( JSON.stringify( personAccount ) ); // 对象克隆，仅用于interface
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  cancel(): void {
    this.tplModal.destroy();
  }

  update(): void {
    this.personAccountService.addPersonAccount(
    this.updatingPersonAccount, this.updatingPersonAccount.personAccountGeneralType.id, this.applicationManage._account.id,
     `${this.updatingPersonAccount.id}`).then(
      res => {
        this.isEditting = false;
        if ( res.code === ResponseCode.SUCCESS ) {
          this.tipService.tip( '更新成功' );
          // 更新 type name
          this.updatingPersonAccount.personAccountGeneralType.name =
          this.applicationManage.getPersonAccountTypeName(  this.updatingPersonAccount.personAccountGeneralType.id );
          this.tplModal.destroy();
        } else {
          this.updatingPersonAccount = this.backupPersonAccount; // 返回到原来的数据
          this.tipService.tip( `更新失败, ${res.msg}` );
        }
      }
    ).catch(
      () => {
        this.isEditting = false;
        this.tipService.tip( `网络错误` );
      }
    );
  }

  deleteOne( id: number, username: string) {
    this.modalService.create({
      nzTitle: '提示',
      nzContent: `确定要删除${username}的账户信息吗？ 删除后无法找回！`,
      nzClosable: false,
      nzOnOk: () => new Promise((resolve) => {
        this.personAccountService.deleteOne( id ).then( res => {
          resolve();
          if ( res.code === ResponseCode.SUCCESS ) {
            this.tipService.tip( '删除成功' );
            this.personAccounts = this.personAccounts.filter(  (v, i, arr) => {
              if ( v.id === id ) {
                return false;
              }
              return true;
            });
          } else {
            this.tipService.tip( `删除失败, ${res.msg}` );
          }
        }).catch(
           () => {
              resolve();
              this.tipService.tip( '删除失败' );
           }
        );
      })
    });
  }
}
