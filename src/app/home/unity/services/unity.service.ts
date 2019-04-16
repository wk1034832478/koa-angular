import { ServiceParent } from '../../../services/service.parent';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ResponseMessage } from '../../../response/ResponseMessage';
@Injectable()
export class UnityService extends ServiceParent {

  constructor( private http2: HttpClient ) { super( http2 ); }

  public getWebAppNames(): Observable<ResponseMessage>{
    return this.getByUrl( "/api/unity/apps" );
  }

  public delete( name: string ): Promise<ResponseMessage>{
    let param = new HttpParams().append("name",  name );
    return this.post("/api/unity/delete",null, param );
  }
}
