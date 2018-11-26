import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HometownComponent } from './hometown/hometown.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
@NgModule({
  declarations: [
    HometownComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
  ]
})
export class HomeModule { }
