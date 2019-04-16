import { NgModule } from '@angular/core';
import { BasicComponent } from './basic/basic.component';
import { RichTextRoutingModule } from './rich-text.routing.module';
import { QuillModule } from 'ngx-quill';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    BasicComponent
  ],
  imports: [
    ShareModule,
    RichTextRoutingModule,
    QuillModule.forRoot(
      {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],                                         // remove formatting button
            ['link', 'image']                         // link and image, video
          ],
        },
      },
    ),
  ],
  exports: [
    QuillModule,
    BasicComponent,
  ]
})
export class RichTextModule { }
