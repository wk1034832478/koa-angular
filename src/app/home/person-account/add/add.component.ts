import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { PersonAccount } from 'src/app/entity/PersonAccount';
import { ApplicationManage } from 'src/app/services/application.manage';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { PersonAccountService } from 'src/app/services/person.account.service';
import { TipService } from 'src/app/services/tip.service';
import { ResponseCode } from 'src/app/response/ResponseCode';
import { PersonAccountGeneralType } from 'src/app/entity/PersonAccountGeneralType';
registerLocaleData(zh);
@Component({
  selector: 'app-person-account-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, AfterViewInit {
  personAccount: PersonAccount;
  validateForm: FormGroup;
  isLoading: boolean;
  dateFormat = 'yyyy/MM/dd';
  personAccountTypes: PersonAccountGeneralType[];
  @Input()
  isUpdate: boolean; // 是否是编辑更新账户
  isSubmittid: boolean; // 是否已经提交过当前表单
  constructor( private applicationManage: ApplicationManage, private personAccountService: PersonAccountService,
    private tipService: TipService) { }
    ngOnInit() {
      if ( !this.personAccount ) {
        this.personAccount = {};
      }
      this.validateForm = new FormBuilder().group({
        username: ['', [ Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        password:  ['', [ Validators.required, Validators.minLength(1), Validators.maxLength(100) ]],
        email:  ['', [ Validators.email ] ],
        phonenumber:  ['', [Validators.pattern(/^[0-9]{11}$/g), Validators.minLength(11), Validators.maxLength(11)]],
        createTime: [new Date(), [ Validators.required ] ],
        canUse: [ 'yes', [ Validators.required ] ],
        personAccountTypeId: ['', [Validators.required]]
      });
      if ( this.isUpdate ) {
        // this.personAccountTypeId = this.personAccount.personAccountGeneralType.id;
        this.validateForm.addControl(  'id', new FormControl( this.personAccount.id, Validators.required ) );
      } else { // 新增加
        this.personAccount.personAccountGeneralType = {};
      }
    }
    ngAfterViewInit() {
      this.loadAccountType();
    }
  /**
   * 加载账户类型
   */
  loadAccountType() {
    if ( this.applicationManage._personAccountTypes ) {
      this.personAccountTypes = this.applicationManage._personAccountTypes;
      return ;
    }
    this.personAccountService.findAllPersonAccountType().then(
      res => {
        if ( res.code === ResponseCode.SUCCESS ) {
          this.applicationManage._personAccountTypes = res.object;
          this.personAccountTypes = res.object;
        } else {
          this.tipService.tip( `加载账户类型失败!` );
        }
      }
    ).catch(
      () => {
        this.tipService.tip( '网络错误' );
      }
    );
  }

  submitForm() {
    this.isSubmittid = true;
    this.isLoading = true;
    this.personAccountService.addPersonAccount( this.personAccount,
      this.personAccount.personAccountGeneralType.id,  this.applicationManage._account.id ,
    this.isUpdate ? `${this.personAccount.id}` : null).then(
      res => {
        this.isLoading = false;
        if ( res.code === ResponseCode.SUCCESS ) {
          this.tipService.tip( `账户更新成功!` );
        } else {
          this.tipService.tip( `账户更新失败!` );
        }
      }
    ).catch(
      () => {
        this.tipService.tip( '网络错误' );
      }
    );
  }
  @Input()
  set _personAccount( personAccount ) {
    if ( personAccount ) {
      this.personAccount = personAccount;
    } else {
      this.personAccount = {};
    }
  }
  // cancel() {
  //   history.back();
  // }

}
