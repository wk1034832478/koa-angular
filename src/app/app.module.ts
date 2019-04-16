import { NgModule } from '@angular/core';
import { ShareModule} from './share/share.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import {  NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HtmlPipe } from './pipies/html.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ShareModule,
    AppRoutingModule,
  ],
  exports: [
    HtmlPipe,
  ],
   /** 配置 ng-zorro-antd 国际化 **/
  providers: [ { provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
