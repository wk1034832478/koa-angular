

import { ApplicationManage } from '../../../services/application.manage';
import { ServiceParent } from '../../../services/service.parent';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ResponseMessage } from '../../../response/ResponseMessage';
import { Page } from '../../../entity/Page';
import { PersonAccount } from '../../../entity/PersonAccount';
import { PersonAccountModule } from '../person-account.module';
import { Injectable } from '@angular/core';
@Injectable()
export class PersonAccountService extends ServiceParent {
    constructor(private http2: HttpClient, private applicationManage: ApplicationManage) { super(http2); }

    search(username: string): Promise<ResponseMessage> {
      const params = new HttpParams().append('username', username).append('id', `${this.applicationManage._account.id}` );
      return this.post(`/api/pas/presearch`, this.jsonHeader, params);
    }

    searchInfo(username: string, email: string, phonenumber: string, page: Page): Promise<ResponseMessage> {
      const params = new HttpParams().append('username', username).append('email', email).append('phonenumber', phonenumber)
      .append('id', `${this.applicationManage._account.id}` ).append( Page.INDEX_NAME, `${page._index}`)
      .append( Page.SIZE_NAME, `${page._size}`);
      return this.post(`/api/pas/search`, this.jsonHeader, params);
    }

    deleteOne( id: number ): Promise<ResponseMessage> {
      return this.idPost(`/api/pas/delete`, id);
    }

    canUsePercent( id: number ): Promise<ResponseMessage> {
      return this.idPost(`/api/pas/usp`, id);
    }
    accountDistribution( id: number ): Promise<ResponseMessage> {
      return this.idPost( `/api/pas/distribution`, id);
    }
    findAllPersonAccountType(): Promise<ResponseMessage> {
      return this.post( `/api/pagt/all`, null , this.jsonHeader);
    }
    /**
     * @param personAccount 个人账户
     * @param personAccountGeneralTypeId 账户类型id
     * @param accountId 账户所属人id
     */
    addPersonAccount( personAccount: PersonAccount, personAccountGeneralTypeId: number, accountId: number, personAccountId?: string )
    : Promise<ResponseMessage> {
      let params = new HttpParams().append( 'username', personAccount.username ).append( 'password', personAccount.password )
      .append('phonenumber', personAccount.phonenumber)
      .append('createTime', `${ personAccount.createTime ? personAccount.createTime.getTime() : new Date().getTime()}` )
      .append('canUse', personAccount.canUse ).append('email', personAccount.email)
      .append('personAccountGeneralType.id', `${personAccountGeneralTypeId}` ).append('account.id', `${accountId}`);
      if ( personAccountId ) {
        params = params.append( 'id', personAccountId );
      }
      return this.post( '/api/pas/new', this.jsonHeader, params );
    }

}
