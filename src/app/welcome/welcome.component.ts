import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  styles  : [
    `[nz-carousel-content] {
    text-align: center;
    height: ${window.innerHeight}px;
    line-height: 160px;
    background: #364d79;
    color: #fff;
    overflow: hidden;
  }
  h3 {
    color: #fff;
  }
  ,
  .gs {
    height: ${window.innerHeight}px;
    width: ${window.innerWidth}px;
  },
  .carousel-buttons{
    height: ${window.innerHeight}px;
    width: ${window.innerWidth}px;
    position: absolute;
    left: 0px;
    top: 0px;
  }
  `
]
})
export class WelcomeComponent implements OnInit {
  images = [ 'g1.jpg', 'g2.jpg', 'g3.jpg', 'g4.jpg' ]; // 展示图片列表
  visible = false;
  placement = 'left'; // 固定从左弹出
  menues: { src: string, routerLink: string, title: string }[] = [
    {
      src: '/assets/images/user.png',
      routerLink : '/auth',
      title: '登陆'
    },
    {
      src: '/assets/images/registry.png',
      routerLink : '/account-manage',
      title: '注册'
    },
  ];
  constructor() { }
  ngOnInit() {
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

}
