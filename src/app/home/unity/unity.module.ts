import { NgModule } from '@angular/core';
import { UnityRoutingModule } from './unity.routing.module';
import { MainComponent } from './main/main.component';
import { UploadComponent } from './upload/upload.component';
import { UnityService } from './services/unity.service';
import { ShareModule } from 'src/app/share/share.module';
@NgModule({
  declarations: [
    MainComponent,
    UploadComponent
  ],
  imports: [
    ShareModule,
    UnityRoutingModule,
  ],
  providers: [
    UnityService
  ]
})
export class UnityModule { 

}
