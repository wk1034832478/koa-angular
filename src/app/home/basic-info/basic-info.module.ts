import { NgModule } from '@angular/core';
import { BasicInfoRoutingModule } from './basic-info.routing.module';
import { IntegerationComponent } from './integeration/integeration.component';
import { MainComponent } from './main/main.component';
import { UpdateComponent } from './update/update.component';
import { ShareModule } from '../../share/share.module';
@NgModule({
  declarations: [
    IntegerationComponent,
    MainComponent,
    UpdateComponent,
  ],
  imports: [
    BasicInfoRoutingModule,
    ShareModule
  ]
})
export class BasicInfoModule { }
