import { Account } from './Account';
import { PersonAccountGeneralType } from './PersonAccountGeneralType';

export interface PersonAccount {
    id?: number;
    username?: string;
    password?: string;
    phonenumber?: string;
    email?: string;
    createTime?: Date;
    canUse?: string; // 账户是否可用
    account?: Account;
    personAccountGeneralType?: PersonAccountGeneralType;
}
