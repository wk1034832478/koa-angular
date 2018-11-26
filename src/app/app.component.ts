import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, transition, animate, style, query, group, state, keyframes } from '@angular/animations';

export const routeAnimation =
  trigger('routeAnimation', [
    transition('* => *', [
      query('#stone.stone', [
        group([
          animate('1ms', style( { height: '2.5px'} ) ),
          animate('1s', keyframes ([
            style( { background: '#096dd9', opacity: 0.4, offset: 0.1 }),
            style( { background: 'green', opacity: 0.7, offset: 0.4 }),
            style( { background: 'red', opacity: 0.4, offset: 0.7 }),
            style( { background: '#096dd9', opacity: 0.8, offset: 0.9 }),
          ]) ) ,
        ])
      ])
    ])
  ]);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [
    `
    html,body{ height: ${window.innerHeight}px; }
    #app{
      height: ${window.innerHeight}px;
    }
    `
  ],
  animations: [
    routeAnimation
  ]
})
export class AppComponent implements OnInit {
  title = 'koa';
  // router跳转动画所需参数
  routerState = true;
  routerStateCode = 'active';
  constructor(private router: Router ) {}
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // 每次路由跳转改变状态
      this.routerState = !this.routerState;
      this.routerStateCode = this.routerState ? 'active' : 'inactive';
      }
    });
  }
}
