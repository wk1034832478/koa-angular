import { PageMessage } from './PageMessage';

export interface ResponseMessage {
    code?: number;
    msg?: string;
    object?: any;
    pageMessage?: PageMessage;
}
