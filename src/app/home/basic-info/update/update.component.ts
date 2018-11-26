import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ApplicationManage } from 'src/app/services/application.manage';
import { BasicInfo } from 'src/app/entity/BasicInfo';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { TipService } from 'src/app/services/tip.service';
import { UserUserviceService } from 'src/app/services/user-uservice.service';
import { ResponseMessage } from 'src/app/response/ResponseMessage';
import { ResponseCode } from 'src/app/response/ResponseCode';
import { LoggerService } from 'src/app/services/logger.service';
import { Account } from 'src/app/entity/Account';
import { Router } from '@angular/router';

registerLocaleData(zh);
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  styles: [
    `[nz-form] {
      max-width: 600px;
    }`
  ]
})
export class UpdateComponent implements OnInit {
  title = '信息更新组件';
  validateForm: FormGroup;
  can: boolean;
  isLoading: boolean;
  basicInfo: BasicInfo;
  dateFormat = 'yyyy-MM-dd';
  account: Account;
  // date: Date = new Date();
  canChange() {
    if (this.can) { // 为true的时候解锁
      this.validateForm.enable({ onlySelf: true });
    } else {
      this.validateForm.disable({ onlySelf: true });
    }
  }
  submitForm(): void {
    this.updateBasicInfo();
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder, private applicationManage: ApplicationManage, private tipService: TipService,
    private userUserviceService: UserUserviceService, private loggerSerivce: LoggerService, private router: Router) { }

  ngOnInit(): void {
    this.waitUserInfo();
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      gender: [null, [Validators.required, this.forbiddenGender()]],
      hometown: [null, [Validators.required]],
      birthday: [null, [Validators.required]]
    });
    this.validateForm.enable({ onlySelf: true });
  }

  waitUserInfo() {
    this.basicInfo = this.applicationManage._basicInfo;
    this.account = this.applicationManage._account;
    if ( !this.basicInfo ) {
      this.basicInfo = {};
      this.can = true;
      this.basicInfo.birthday = new Date();
    }
    this.loggerSerivce.log(this, `时间类型：${typeof this.basicInfo.birthday}`);
    this.loggerSerivce.log(this, `当前时间：${this.basicInfo.birthday.toString()}`);
  }
  /**
   * 验证性别
   */
  forbiddenGender(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const ok = /^(男|女){1}$/.test(control.value);
      return ok ? null : { 'forbiddenGender': { value: control.value } };
    };
  }
  /**
   * 更新用户基本信息
  **/
  updateBasicInfo() {
    //
    this.isLoading = true;
    this.loggerSerivce.log(this, `当期时间：${this.basicInfo.birthday}`);
    if ( this.applicationManage._basicInfo ) {
      this.basicInfo.id = this.applicationManage._basicInfo.id;
    }
    if (this.applicationManage._account) {
      this.basicInfo.account = this.applicationManage._account;
    }
    this.userUserviceService.updateBasicInfo(this.basicInfo, this.applicationManage._account.id).then((data: ResponseMessage) => {
      this.isLoading = false;
      if (data.code === ResponseCode.SUCCESS) {
        this.applicationManage._basicInfo = data.object;
        this.basicInfo = data.object;
        this.tipService.tip('更新成功');
      } else {
        this.tipService.tip('更新失败');
      }
    }).catch(e => {
      this.isLoading = false;
      this.tipService.tip(`网络错误，${e}`);
    });
  }

  handleChange({ file, fileList }): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.tipService.tip(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.tipService.tip(`${file.name} file upload failed.`);
    }
  }

  cancel() {
    this.router.navigateByUrl( '/home/hometown' );
  }
}
