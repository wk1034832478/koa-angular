import { NgModule } from '@angular/core';
import { SocialContactRoutingModule } from './social-contact.routing,module';
import { MainComponent } from './main/main.component';
import { RichTextModule } from 'src/app/rich-text/rich-text.module';
import { PlaygroundComponent } from './playground/playground.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ShareModule } from '../../share/share.module';
import { SocialContactService } from './services/social-contact.service';
@NgModule({
  declarations: [
    MainComponent,
    PlaygroundComponent,
  ],
  imports: [
    ShareModule,
    SocialContactRoutingModule,
    RichTextModule,
    InfiniteScrollModule,
  ],
  exports: [
    MainComponent,
  ],
  providers:[
    SocialContactService
  ]
})
export class SocialContactModule { }
