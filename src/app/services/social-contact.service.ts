import { Injectable } from '@angular/core';
import { ServiceParent } from './service.parent';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseMessage } from '../response/ResponseMessage';
import { PersonDynamic } from '../entity/PersonDynamic';

@Injectable({
  providedIn: 'root'
})
export class SocialContactService extends ServiceParent {

  constructor(private http2: HttpClient) { super( http2 ); }

  getPersonDynamic( page: number, pageSize: number ): Promise<ResponseMessage> {
    const params = new HttpParams().append( 'page', `${page}`).append( 'pageSize', `${pageSize}`);
    return this.post('/api/social-contact/dynamic-get', this.jsonHeader, params );
  }

  addPersonDynamic( personDynamic: PersonDynamic, accountId: number ): Promise<ResponseMessage> {
    const params = new HttpParams().append( 'contentOfRichText', personDynamic.contentOfRichText)
    .append( 'title', personDynamic.title ).append('watchPriority', personDynamic.watchPriority).append( 'account.id' , `${accountId}`);
    return this.post('/api/social-contact/dynamic-add', this.jsonHeader, params);
  }
}
