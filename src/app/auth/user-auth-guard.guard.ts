import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserUserviceService } from '../services/user-uservice.service';
import { resolve, reject } from 'q';
import { ResponseMessage } from '../response/ResponseMessage';
import { ResponseCode } from '../response/ResponseCode';
import { LoggerService } from '../services/logger.service';
import { ApplicationManage } from '../services/application.manage';
import { TipService } from '../services/tip.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardGuard implements CanActivate {
  title = '用户登陆守卫';
  constructor(private userUserviceService: UserUserviceService, private loggerSerivce: LoggerService, private router: Router,
    private applicationManage: ApplicationManage, private tipService: TipService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.loggerSerivce.log(this, '正在检查用户是否登陆' );
      return new Promise( (resolve1, reject2) => {
        this.loggerSerivce.log(this, '发送请求' );
        this.userUserviceService.getUser().then( (data: ResponseMessage) => {
          if ( data.code === ResponseCode.SUCCESS ) { // 已经登陆
            this.loggerSerivce.log(this, '用户已经登陆' );
            this.loggerSerivce.log(this, `开始获取个人信息`);
            const promise: Promise<any> = this.loadUserInfo( );
            promise.then( () => {
              resolve1(true);
              this.tipService.tip( `获取信息成功！`);
              if ( this.applicationManage._basicInfo === null ) { // 补全身份信息

              }
            }).catch( () => {
              this.tipService.tip( `获取信息失败`);
            });
          } else { // 未登陆
            this.loggerSerivce.log(this, '用户还未登陆' );
            resolve1(false);
            // 导航至登陆页面
            this.router.navigate(['auth']);
          }
        }).catch( res => {
          this.loggerSerivce.log(this, '出现错误！' );
          reject2(false);
        });
      });
  }

    /**
   * 加载用户账户信息 个人信息
   */
  async loadUserInfo (): Promise<any> {
    const data: ResponseMessage = await this.userUserviceService.getAccount();
    if ( data.code === ResponseCode.SUCCESS) {
      this.applicationManage._account = data.object;
    } else {
      throw new Error( `错误代码:${data.code},${data.msg}` );
    }
    const data2: ResponseMessage = await this.userUserviceService.getBasicInfo( this.applicationManage._account.id );
    if ( data2.code === ResponseCode.SUCCESS) {
      this.applicationManage._basicInfo = data2.object;
    } else if (  data2.code === ResponseCode.LOST ) { // 还未补全身份信息
      // 需要进入身份信息填写界面
    } else {
      throw new Error( `错误代码:${data.code},${data.msg}` );
    }
}
}
