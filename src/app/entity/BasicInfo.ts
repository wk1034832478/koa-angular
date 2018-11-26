import { Account } from './Account';
export interface BasicInfo {
    id?: number;
    name?: string;
    birthday?: Date;
    age?: number;
    gender?: string;
    hometown?: string;
    account?: Account;
    photo?: string;
    // set _birthday( date: Date ) {
    //     this.birthday = date;
    // }
    // get _birthday( ) {
    //     return this.birthday;
    // }
}
