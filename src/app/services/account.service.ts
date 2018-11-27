import { Injectable } from '@angular/core';
import { ServiceParent } from './service.parent';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account } from '../entity/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ServiceParent {

  constructor( private http2: HttpClient ) { super( http2 ); }

  saveOrUpdate( account: Account, isLogin = false ) {
    let params = new HttpParams().append( 'username', account.username ).append('password', account.password)
    .append('phonenumber', account.phonenumber);
    if ( !isLogin ) {
        params = params.append('isLogin', `${isLogin}`);
    }
    return this.post( '/api/account/save', this.jsonHeader, params );
  }
}
