import { NgModule } from '@angular/core';
import { HometownComponent } from './hometown/hometown.component';
import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { ShareModule } from '../share/share.module';
@NgModule({
  declarations: [
    HometownComponent,
    MainComponent
  ],
  imports: [
    ShareModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
