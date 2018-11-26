import { NzMessageService } from 'ng-zorro-antd';
import { Injectable } from '@angular/core';

/**
 * 提示信息服务类
 */

@Injectable({
    providedIn: 'root'
})
export class TipService {
    constructor(private nzMessageService: NzMessageService) {}
    /**
     *
     * @param msg 提示的信息
     */
    tip( msg: string, time = 1000 ) {
        let id;
        id = this.nzMessageService.loading( msg, { nzDuration: time });
        setTimeout( () => {
          this.nzMessageService.remove( `${id}` );
        }, time);
    }
}
