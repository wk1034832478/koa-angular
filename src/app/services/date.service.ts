
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DateService {
    // Nov 21, 2018 8:00:00 AM
    DATE_REGEX = '^([a-zA-Z]{3})\\s([0-9]{1,2}),\\s([0-9]{4})\\s{1}([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})\\s([a-zA-Z]{2})$';
    // 英文的月份
    monthes: string[] = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    Morning = 'AM';
    Afternoon = 'PM';
    reg: RegExp;
    constructor() {
        this.reg = new RegExp(this.DATE_REGEX);
    }
    convertDate( date: string | Date ) {
        if ( this.reg.test( date.toString() ), 'g' ) {
            const month: string = RegExp.$1; // 月份
            const monthIndex = this.getMonthIndex( month );
            const dayOfMonth: number = +RegExp.$2;
            const year = +RegExp.$3 ;
            let hour = +RegExp.$4 ;
            const minute = +RegExp.$5 ;
            const second = +RegExp.$6 ;
            const morOrAft = RegExp.$7 ;
            if ( morOrAft === 'PM') {
                hour += 12;
            }
            const date: Date = new Date( year, monthIndex, dayOfMonth, hour, minute, second);
            return date;
        }
        throw Error( '日期解析失败' );
    }

   getMonthIndex(  month: string ): number {
        for ( let i = 0; i < this.monthes.length; i++ ) {
            if ( month ===  this.monthes[i] ) {
                return i;
            }
        }
       throw new Error( `未知的月份: ${month}` );
    }
}
