import { Component, OnInit } from '@angular/core';
import { UserUserviceService } from 'src/app/services/user-uservice.service';
import { Account } from '../../entity/Account';
import { LoggerService, LoggerTarget } from 'src/app/services/logger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from 'src/app/response/ResponseMessage';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { TipService } from 'src/app/services/tip.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, LoggerTarget {
  title = '登陆组件';
  account: Account = {};
  isLoginning: boolean;
  isSuccess: boolean;
  isAuthenticated: boolean;
  badUser: boolean;
  isError: boolean;
  msg: string;

  constructor( private nzMessageService: NzMessageService, private userUserviceService: UserUserviceService,
    private loggerService: LoggerService, private router: Router, private tipService: TipService) { }

  ngOnInit() {
  }
  login( ) {
    this.reset();
    this.isLoginning = true;
    this.userUserviceService.login( this.account.username , this.account.password )
    .then( (data: ResponseMessage) => {
        this.isLoginning = false;
        if ( data.msg === 'ok' ) {
            this.loggerService.log(this, '登陆成功' );
            this.isSuccess = true ;
            this.msg = '登陆成功';
            this.gotoHome();
        } else if ( data.msg === 'authenticated' ) { // 已经登陆过
          this.loggerService.log(this, `用户已经登陆！` );
          this.isAuthenticated = true;
          this.msg = '用户已经登陆！';
          this.gotoHome();
        } else {
            this.badUser = true;
            this.loggerService.log(this, `登陆失败,${data.msg}` );
            this.msg = '登陆失败,用户名或密码错误';
        }
    })
    .catch( (res: HttpErrorResponse) => {
        this.loggerService.log(this, res.message );
        this.isLoginning = false;
        this.isError = true;
        this.msg = '网络出现错误！';
    });
  }

  gotoHome() {
    this.tipService.tip(  '正在跳转至主页');
    this.loggerService.log(this, `正在跳转至【home】`);
    this.router.navigate( ['home'] );
  }

  reset() {
    this.isSuccess = false;
    this.isAuthenticated = false;
    this.badUser = false;
    this.isError = false;
  }
}
