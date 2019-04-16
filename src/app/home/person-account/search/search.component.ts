import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResponseMessage } from 'src/app/response/ResponseMessage';
import { PersonAccountService } from 'src/app/home/person-account/services/person.account.service';
import { ResponseCode } from 'src/app/response/ResponseCode';
import { TipService } from 'src/app/services/tip.service';
import { Page } from 'src/app/entity/Page';
import { PersonAccount } from 'src/app/entity/PersonAccount';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  styles: [`
  .global-search-item-count {
    position: absolute;
    right: 16px;
  }
  `]
})
export class SearchComponent implements OnInit {
  inputValue: string;
  isLoading: boolean;
  options = [];
  page: Page = new Page();
  personAccount: PersonAccount;
  @Output()
  pageEventEmit = new EventEmitter<any>();
  @Output()
  searchEventEmit = new EventEmitter<any>();
  constructor(private personAccountService: PersonAccountService, private tipService: TipService) { }

  ngOnInit() {
  }
  /**
   *  输入时更新
  */
  onChange(value: string): void {
    this.presearch( value );
  }
  presearch( value: string ) {
    this.personAccountService.search( value ).then( (data: ResponseMessage) => {
      this.options = [];
      if ( data.code === ResponseCode.SUCCESS && data.object) {
          const objs: string[][]  = data.object;
          for ( let i = 0; i < objs.length; i++) {
            this.options.push( { value, category: `${ objs[i][2]}`,  count: objs[i][0] } );
          }
      } else {
        alert( `没有搜索到相关信息，${data.object}` );
      }
    }).catch(  // 发生网络错误，请重新检查网络或登陆后再次尝试
        () => {
          this.tipService.tip( `网络错误，请稍后再尝试！` );
        }
    );
  }

  search( order = 0 ) {
      this.isLoading = true;
      this.searchEventEmit.emit( this.isLoading );
      switch ( order ) {
        case 0:
        this.page._size = 10000; // 加载全部的账户信息
        this.searchByUsername();
        break;
      }
  }

  searchByUsername( ) {
      this.personAccountService.searchInfo( this.inputValue, '', '', this.page )
      .then( res => {
        this.isLoading = false;
        if ( res.code === ResponseCode.SUCCESS ) {
          this.pageEventEmit.emit( { page: this.page, data: res.object, isLoading: this.isLoading });
          this.personAccount = res.object;
        } else {
          this.tipService.tip(`搜索失败, ${res.msg}`);
        }
      }).catch( () => {
        this.isLoading = false;
        this.tipService.tip(`网络故障，请稍后再次尝试`);
      });
  }

}
