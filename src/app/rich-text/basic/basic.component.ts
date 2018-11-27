import { Component, OnInit, AfterViewInit, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import * as $ from 'jquery';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-rich-text-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css', ],
  styles: [
    `
    .ant-modal {
      width: 100%;
    }
    `
  ]
})
export class BasicComponent implements OnInit, AfterViewInit {
  _editorContent: any ;
  placeholder = '开始编辑你的生活图集吧';
  style = {
    height: '600px'
  };
  bounds = document.getElementById( 'rich-text-container' );
  title = '基本信息组件';
  @Output()
  quillEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  preview: JQuery;
  tplModal: NzModalRef;
  constructor( private loggerService: LoggerService,  private modalService: NzModalService) { }

  ngOnInit() {
  }

  previewHtml( tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    const e = new EventEmitter<any>();
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzBodyStyle: {

      },
      nzAfterOpen: e
    });
    e.subscribe( () => {
      this.preview = $('#preview');
        this.preview.html( this._editorContent.html );
    });
  }

  cancel(): void {
    this.tplModal.destroy();
  }

  ngAfterViewInit() {
  }
  @Input()
  set editorContent( value ) {
    this._editorContent = value;
    if ( !value ) {
      return;
    }
    this.quillEventEmitter.emit( this._editorContent.html );
  }


  onContentChanged( value ) {
    this.loggerService.log( this, value );
    this._editorContent = value;
    this.quillEventEmitter.emit( value.html );
  }

}
