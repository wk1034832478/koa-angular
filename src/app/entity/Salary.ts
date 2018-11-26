import { WorkCompany } from './WorkCompany';
import { Account } from './Account';

export interface Salary {
    id?: number;
    mount?: number;
    deliverDate?: Date;
    workCompany?: WorkCompany;
    account?: Account;
}
