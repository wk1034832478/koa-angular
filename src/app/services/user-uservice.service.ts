import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ServiceParent } from './service.parent';
import { BasicInfo } from '../entity/BasicInfo';
import { DateService } from './date.service';
import { ResponseMessage } from '../response/ResponseMessage';
@Injectable({
  providedIn: 'root'
})
export class UserUserviceService extends ServiceParent {

  constructor(private http2: HttpClient, private dateService: DateService) { super( http2 ); }
  /**
   * 根据用户名和密码获取用户信息
   * @param username 用户名
   * @param password 密码
   */
  login( username: string, password: string ): Promise<ResponseMessage> {
      const params = new HttpParams().append( 'username', username).append('password', password);
      return  this.post('/api/user/login', this.jsonHeader, params);
  }
  getUser (): Promise<ResponseMessage> {
    return this.post('/api/user/get', this.jsonHeader, null);
  }
  logout() {
    return this.post('/api/user/logout', this.jsonHeader, null);
  }
  /**
   * 获取个人的账户信息
   */
  getAccount(): Promise<ResponseMessage> {
    return this.post('/api/account/get', this.jsonHeader, null);
  }
  /**
   * 获取个人的账户信息
   */
  getBasicInfo( id: number ): Promise<ResponseMessage> {
    const param =  new HttpParams().append( 'id', `${id}` );
    return this.post('/api/basicinfo/get', this.jsonHeader, param);
  }

  updateBasicInfo( basicinfo: BasicInfo, accountId: number): Promise<ResponseMessage> {
    const url = `/api/basicinfo/update`;
    let param = new HttpParams();
    if ( basicinfo.id ) {
      param = param.append( 'id', `${basicinfo.id}` );
    }
    param = param.append('birthday', `${basicinfo.birthday.getTime()}`)
    .append('age', `${basicinfo.age}`).append('gender', `${basicinfo.gender}`)
    .append('hometown', `${basicinfo.hometown}`).append('name', `${basicinfo.name}`)
    .append('account.id', `${ accountId }`);
    return this.post( url , this.jsonHeader, param);
  }
}
