import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { UserUserviceService } from 'src/app/services/user-uservice.service';
import { ResponseMessage } from 'src/app/response/ResponseMessage';
import { ResponseCode } from 'src/app/response/ResponseCode';
import { NzMessageService } from 'ng-zorro-antd';
import { ApplicationManage } from 'src/app/services/application.manage';
import { TipService } from 'src/app/services/tip.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-hometown',
  templateUrl: './hometown.component.html',
  styleUrls: ['./hometown.component.css'],
  styles: [
    `
    .ant-layout.ant-layout-has-sider{
      height: 100%;
    }
    :host ::ng-deep .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color .3s;
    }
    :host ::ng-deep .trigger:hover {
      color: #1890ff;
    }
    :host ::ng-deep .logo {
      height: 32px;
      background: rgba(255, 255, 255, .2);
      margin: 16px;
    }
  `
  ]
})
export class HometownComponent implements OnInit {
  isCollapsed = false;
  triggerTemplate = null;
  isLogouting: boolean;
  title = '家组件';
  photoPath: string;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  constructor(private router: Router, private route: ActivatedRoute, private userUserviceService: UserUserviceService,
    private nzMessageService: NzMessageService, public applicationManage: ApplicationManage, private tipService: TipService,
    private loggerSerivce: LoggerService) { }
  ngOnInit() {
    this.route.url.subscribe(url => {
      this.loggerSerivce.log(this, `当前位置：${url}`);
    });
    this.photoPath = this.applicationManage.getPhotoPath();
    if (  !this.applicationManage._basicInfo  ) {
      this.router.navigate(['basic-info', 'update'], { relativeTo: this.route });
    } else {
      this.goto();
    }
  }

  goto() {
    this.router.navigate(['social-contact'], { relativeTo: this.route });
  }

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  logout() {
    this.isLogouting = true;
    this.userUserviceService.logout().then(
      (data: ResponseMessage) => {
        this.isLogouting = false;
        if (data.code === ResponseCode.SUCCESS) {
          this.tipService.tip('注销成功');
          // 清除用户信息
          this.applicationManage.clear();
          this.router.navigateByUrl('/auth');
        } else {
          this.tipService.tip('注销失败,当前用户不在线');
        }
      }
    );
  }

}
