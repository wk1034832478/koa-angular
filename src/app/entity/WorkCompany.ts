import { Account } from './Account';

export interface WorkCompany {
    id?: string;
    name?: string; // 公司名称
    isWorking?; // 是否仍在入职
    enterDate?: Date; // 入职时间, 默认是当前的录入时间
    leaveDate?: Date; // 离职时间
    address?: string; // 公司地址
    account?: Account; // 所属账户
}
