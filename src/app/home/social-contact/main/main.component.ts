import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { ApplicationManage } from 'src/app/services/application.manage';
import { PersonDynamic } from 'src/app/entity/PersonDynamic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialContactService } from 'src/app/services/social-contact.service';
import { TipService } from 'src/app/services/tip.service';
import { ResponseCode } from 'src/app/response/ResponseCode';

@Component({
  selector: 'app-social-contact-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  priorities = [ 'public', 'private', 'friend' ];
  title = '社交主组件';
  isLoading: boolean;
  personDynamic: PersonDynamic;
  validateForm: FormGroup;
  constructor( private loggerService: LoggerService, private applicationManage: ApplicationManage,
    private socialContactService: SocialContactService, private tipService: TipService) { }
  ngOnInit() {
    this.personDynamic = {};
    this.validateForm = new FormBuilder().group({
      title: [ '', [ Validators.required, Validators.minLength(2) ]],
      watchPriority: [ '', [ Validators.required, Validators.minLength(2) ]],
    });
  }

  onvaluechange( value ) {
    this.loggerService.log( this, `富文本当前内容：${value}`);
    this.personDynamic.contentOfRichText = value;
  }

  submitForm() {
    if ( !this.personDynamic.contentOfRichText ) {
      this.tipService.tip( '请先填写动态内容' );
      return;
    }
    this.isLoading = true;
    this.socialContactService.addPersonDynamic( this.personDynamic, this.applicationManage._account.id ).then(
      res => {
        this.isLoading = false;
        this.tipService.tip( `${res.msg}` );
      }
    ).catch(
      () => {
        this.isLoading = false;
          this.tipService.tip( '网络故障！' );
      }
    );
  }
}
