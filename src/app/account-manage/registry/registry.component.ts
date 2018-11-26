import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Account } from 'src/app/entity/Account';
import { MessageService } from 'src/app/services/message.service';
import { TipService } from 'src/app/services/tip.service';
import { ResponseCode } from 'src/app/response/ResponseCode';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css'],
  styles: [ `
    .login-form {
      max-width: 300px;
    }

    .login-form-forgot {
      float: right;
    }

    .login-form-button {
      width: 100%;
    }
  `]
})
export class RegistryComponent implements OnInit {
  validateForm: FormGroup;
  isLoading: boolean;
  tplModal: NzModalRef;
  tplModalButtonLoading = false;
  htmlModalVisible = false;
  account: Account;
  captureCode: string;
  isPassCaptureCode: number; // 是否通过验证码
  @ViewChild('tplTitle')
  tplTitle: TemplateRef<{}>;
  @ViewChild('tplContent')
  tplContent: TemplateRef<{}>;
  @ViewChild('tplFooter')
  tplFooter: TemplateRef<{}>;
  submitForm(): void {
  }

  constructor(private fb: FormBuilder, private modalService: NzModalService,
     private messageService: MessageService, private tipService: TipService,
      private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.account = {};
    this.validateForm = this.fb.group({
      username: [ null, [ Validators.required, Validators.minLength(4), Validators.maxLength(20) ] ],
      password: [ null, [ Validators.required, Validators.minLength(4), Validators.maxLength(20)  ] ],
      phonenumber: [null, [ Validators.pattern('^[0-9]{11}$') ]],
      captureCode: [ null, [  ]], // Validators.required, Validators.pattern( '^[0-9]{4,6}$' ) 测试阶段，暂关闭验证码拦截
      isPassCaptureCode: [ null , [ Validators.required, Validators.pattern('^1$')] ],
      isLogin: [ false, [] ]
    });
    this.validateForm.addControl( 'passwordValidate' ,
    new FormControl(  null, [ Validators.required, this.equalPasswordValidator()]  )  );
    this.isPassCaptureCode = 1;
  }

  equalPasswordValidator( ): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if ( control.value === this.validateForm.controls[ 'password' ].value ) {
        return null;
      }
      return {'passwordValidate': {value: control.value}};
    };
  }

  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  destroyTplModal(): void {
    this.tplModalButtonLoading = true;
    this.tplModalButtonLoading = false;
    this.tplModal.destroy();
  }

  sendCaptureCode( ) {
    if ( this.validateForm.controls[ 'phonenumber'].errors ) {
      this.tipService.tip( '请先输入正确的手机号' );
      return;
    }
    this.messageService.generateCaptureCode( this.account.phonenumber ).then(
       res => {
         if ( res.code === ResponseCode.SUCCESS ) {
            // 打开弹窗
            this.createTplModal(this.tplTitle, this.tplContent, this.tplFooter);
         } else {
           this.tipService.tip( res.msg );
        }
       }
    ).catch(
        () => {
          this.tipService.tip( '网络故障' );
        }
    );
  }

  validateCaptureCode() {
    this.messageService.ensureCaptureCode( this.captureCode ).then(
      res => {
        if ( res.code === ResponseCode.SUCCESS ) {
            this.tipService.tip( '验证通过' );
            this.destroyTplModal();
            this.isPassCaptureCode = 1;
            return;
        }
        this.tipService.tip( '验证失败' );
      }
    ).catch( () => {
        this.tipService.tip( '网络故障' );
    });
  }

  saveOrUpdate() {
    this.accountService.saveOrUpdate( this.account )
    .then(
      res => {
        if ( res.code === ResponseCode.SUCCESS ) {
          this.tipService.tip( '创建成功' );
          if ( this.validateForm.controls[ 'isLogin' ].value ) { // 自动登录，跳转至主页，否则进入登录页面
              this.router.navigateByUrl( '/home' );
          } else {
             this.router.navigateByUrl( '/auth' );
          }
        } else {
          this.tipService.tip( `创建失败, ${ res.msg }` );
        }
      }
    ).catch( () => {
      this.tipService.tip( '网络故障' );
    });
  }

}
