import { Injectable } from '@angular/core';
import { Account } from '../entity/Account';
import { BasicInfo } from '../entity/BasicInfo';
import { DateService } from './date.service';
import { LoggerService } from './logger.service';
import { UsePercent } from '../entity/UsePercent';
import { AccountDistribution } from '../entity/AccountDistribution';
import { PersonAccountGeneralType } from '../entity/PersonAccountGeneralType';
/**
 * 全局对象管理
 */
@Injectable({
    providedIn: 'root'
  })
export class ApplicationManage {
    title = '应用管理';
    private account: Account; // 当前登陆账户
    private basicInfo: BasicInfo; // 当前账户的基本信息
    private usePercent: UsePercent;
    private accountDistribution: AccountDistribution[];
    private personAccountTypes: PersonAccountGeneralType[];
    constructor(private dateService: DateService, private LoggerService: LoggerService) {
    }
    clear() {
        this.account = null;
        this.accountDistribution = null;
        this.basicInfo = null;
        this.usePercent = null;
    }
    /**
     * 根据类型的id查找类型的name
     * @param id 类型id
     */
    getPersonAccountTypeName( id: number ) {
        if ( !this.personAccountTypes ) {
            return null;
        }
        for ( let i = 0; i < this.personAccountTypes.length; i++ ) {
            if ( this.personAccountTypes[i].id === id ) {
                return this.personAccountTypes[i].name;
            }
        }
        return null;
    }

    getPhotoPath() {
        if ( !this.basicInfo ) {
            return `/api/basic/photo?id=${this.account.id}&photo=default`;
        }
        return `/api/basic/photo?id=${this.account.id}&photo=${this.basicInfo.photo}`;
    }
    set _personAccountTypes( personAccountTypes ) {
        this.personAccountTypes = personAccountTypes;
    }
    get _personAccountTypes() {
        return this.personAccountTypes;
    }
    set _accountDistribution( accountDistribution ) {
        this.accountDistribution = accountDistribution;
    }
    get _accountDistribution() {
        return this.accountDistribution;
    }
    /**
     * setter getter
     */
    set _account  ( account: Account ) {
        this.account = account;
    }
    get _account  ( ) {
        return this.account;
    }
    set _usePercent  ( usePercent: UsePercent ) {
        this.usePercent = usePercent;
    }
    get _usePercent  ( ) {
        if ( !this.usePercent ) {
            this.usePercent = {};
        }
        return this.usePercent;
    }
    set _basicInfo  ( basicInfo: BasicInfo ) {
        this.LoggerService.log(this, `应用管理正在设置用户基本信息`);
        this.basicInfo = basicInfo;
        // 将时间字符串更改时间类型
        if ( basicInfo && typeof( basicInfo.birthday )  === 'string' ) {
            this.LoggerService.log(this, `字符串时间转化为Date类型`);
            this.basicInfo.birthday = this.dateService.convertDate( basicInfo.birthday );
        }
    }
    get _basicInfo  ( ) {
        if ( this.basicInfo && !this.basicInfo.birthday ) {
            //
            this.basicInfo.birthday = new Date();
        }
        return this.basicInfo;
    }
}
