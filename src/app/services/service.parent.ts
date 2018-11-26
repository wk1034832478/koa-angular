import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { ResponseMessage } from '../response/ResponseMessage';

export class ServiceParent {
    /**
     * 公共头部
     */
    jsonHeader = new HttpHeaders().append('content-type', 'application/json; charset=utf-8');
    constructor( private http: HttpClient ) {}
    /**
   * 执行post请求获取json数据
   * @param url 请求的url
   * @param header 请求的头信息对象
   * @param params 请求的参数对象
   */
  public post( url: string, header: any, params: any): Promise<ResponseMessage> {
    return this.http.post( url, 'body', { headers: header, params: params }).pipe( retry(3) ).toPromise();
  }

  /**
   * 发送json数据
   */
  public postJson( url: string, body: any, header: any,  ): Promise<ResponseMessage> {
    return this.http.post( url, body, { headers: header}).pipe( retry(3) ).toPromise();
  }
  /**
   * @param url 仅仅通过id来查询的接口url
   * @param id id
   */
  idPost( url: string, id: number ): Promise<ResponseMessage> {
    const params = new HttpParams().append('id', `${id}`);
    return this.post( url , this.jsonHeader, params);
  }
}
