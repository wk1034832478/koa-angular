import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PersonDynamic } from 'src/app/entity/PersonDynamic';
import { ApplicationManage } from 'src/app/services/application.manage';
import { Page } from 'src/app/entity/Page';
import { SocialContactService } from '../services/social-contact.service';
import { TipService } from 'src/app/services/tip.service';
import { ResponseCode } from 'src/app/response/ResponseCode';
import { PageMessage } from 'src/app/response/PageMessage';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit, AfterViewInit {
  title = '动态广场';
  isLoading = true;
  header = '系统动态';
  page: Page;
  personDynamic: PersonDynamic[] = [];
  pageMessage: PageMessage;
  defaultImagePath = '/assets/images/default-pd.gif';
  constructor( private socialContactService: SocialContactService , private applicationManage: ApplicationManage,
    private tipService: TipService, private loggerService: LoggerService) { }

  ngOnInit() {
    this.initPage();
  }
  ngAfterViewInit() {
    this.loadPersonDynamic( true );
  }

  initPage() {
    this.page = new Page();
    this.page.reset();
  }
  /**
   * 加载个人动态信息
   * @param isInit 是否是初始化，
   */
  loadPersonDynamic( isInit = true ) {
    this.isLoading = true;
    // 生成page和pageSize
    if ( !isInit ) {
      if ( this.page.hasNext( ) ) {
        this.page = this.page.next();
      } else {
        this.isLoading = false;
        this.tipService.tip( '没有更多数据啦！' );
        return;
      }
    }
    this.socialContactService.getPersonDynamic( this.page._index, this.page._size ).then(
      res => {
        try {
            this.isLoading = false;
            if ( res.code === ResponseCode.SUCCESS ) {
              this.tipService.tip( '加载成功！', 1000 );
              if ( isInit ) {
                this.personDynamic = res.object; // 是一个列表
              } else {
                this.personDynamic = [ ...this.personDynamic, ...(res.object as PersonDynamic[]) ]; // 列表追加
              }
              this.pageMessage = res.pageMessage;
              this.page._index = this.pageMessage.currentPage;
              this.page._size = this.pageMessage.currentPageSize;
              this.page._totalElements = this.pageMessage.totalElements;
              this.page._totalPages = this.pageMessage.totalPages;
            } else {
              this.tipService.tip( res.msg );
            }
        } catch ( e ) {
          this.loggerService.log( this, `错误：${e}` );
          this.tipService.tip( `错误：${e}`);
        }
      }
    ).catch(
      () => {
        this.isLoading = false;
        this.tipService.tip( '网络错误！');
      }
    );
  }

  onScroll() {
    this.loggerService.log( this, `正在加载数据！` );
    this.loadPersonDynamic( false );
  }
}
