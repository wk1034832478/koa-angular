import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialContactRoutingModule } from './social-contact.routing,module';
import { MainComponent } from './main/main.component';
import { RichTextModule } from 'src/app/rich-text/rich-text.module';
import { PlaygroundComponent } from './playground/playground.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms'; // 响应式表单
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    MainComponent,
    PlaygroundComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SocialContactRoutingModule,
    RichTextModule,
    InfiniteScrollModule,
  ],
  exports: [
    MainComponent,
  ]
})
export class SocialContactModule { }
