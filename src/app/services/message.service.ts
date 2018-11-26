import { Injectable } from '@angular/core';
import { ServiceParent } from './service.parent';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseMessage } from '../response/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends ServiceParent {
    constructor( private http2: HttpClient ) { super( http2 ); }
    /**
     *  发送验证码
     * @param phonenumber 要发送验证码的手机号
     */
    generateCaptureCode( phonenumber: string ): Promise<ResponseMessage> {
        return this.post( `/api/user/capture`, this.jsonHeader, new HttpParams().append( 'phonenumber', phonenumber ));
    }

    ensureCaptureCode( code: string ) {
        return this.post( `/api/user/validate_capture`, this.jsonHeader, new HttpParams().append( 'code', code ));
    }
}
