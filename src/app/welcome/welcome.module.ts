import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    ShareModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
