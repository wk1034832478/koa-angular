import { Injectable } from '@angular/core';
export interface LoggerTarget {
  title: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor() { }
  log(target: LoggerTarget, msg: string) {
    console.log( `${new Date()} ${target.title}: ${msg}`);
  }
}
