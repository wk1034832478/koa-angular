import { Component, OnInit } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  filename = "war";
  url = 'api/unity/upload';

  constructor() { }

  ngOnInit() {
  }

  beforeUpload = ( file: UploadFile ) => {
    console.log( "文件名：" + file.name );
    let names = file.name.split("\.");
    console.log( "文件后缀名:" +  names[ names.length -1 ] );
    if (  names[ names.length -1 ] !== 'war' ) {
      return false
    }
    return true;
  }

  handleChange($event) {
    console.log( $event );
  }

}
