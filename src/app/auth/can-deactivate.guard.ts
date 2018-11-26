import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
/**
 * 可处理未保存的组件
 */
export interface CanDeactivateComponent {
  canDeactive(): Promise<boolean> | Observable<boolean> | boolean;
}
@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements  CanDeactivate<CanDeactivateComponent> {
  canDeactivate(component: CanDeactivateComponent) {
    return component.canDeactive ? component.canDeactive() : true;
  }
}
