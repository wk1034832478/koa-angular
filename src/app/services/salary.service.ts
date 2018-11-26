import { Injectable } from '@angular/core';
import { ServiceParent } from './service.parent';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseMessage } from '../response/ResponseMessage';
import { WorkCompany } from '../entity/WorkCompany';
import { Salary } from '../entity/Salary';

@Injectable({
  providedIn: 'root'
})
export class SalaryService extends ServiceParent {

  constructor(private http2: HttpClient) { super(http2); }

  findAllSalary( id: number ): Promise<ResponseMessage> {
    return this.idPost(`/api/salary/findall`, id);
  }
  addWorkCompany( workCompany: WorkCompany, accountId: number ): Promise<ResponseMessage> {
    let params = new HttpParams().append('name', workCompany.name).append('address', workCompany.address)
    .append('enterDate', `${ workCompany.enterDate.getTime()}`).append('isWorking', workCompany.isWorking)
    .append('account.id', `${accountId}`);
    if ( workCompany.leaveDate ) {
      params = params.append( 'leaveDate', `${workCompany.leaveDate.getTime()}` );
    }
    return this.post(`/api/workcompany/save`, this.jsonHeader, params );
  }
  getWorkCompany(  id: number, isWorking: string ): Promise<ResponseMessage> {
    const params = new HttpParams().append('id', `${id}`).append('isWorking', isWorking);
    return this.post(`/api/workcompany/find_aid_isworking`, this.jsonHeader, params );
  }

  addSalary( salary: Salary, accountId: number ) {
    const params = new HttpParams().append('account.id', `${accountId}`).append('deliverDate', `${salary.deliverDate.getTime()}`)
    .append('mount', `${salary.mount}`).append( 'workCompany.id', salary.workCompany.id);
    return this.post(`/api/salary/save`, this.jsonHeader, params );
  }
}
