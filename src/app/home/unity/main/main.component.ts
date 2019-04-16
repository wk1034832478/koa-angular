import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { UnityService } from 'src/app/home/unity/services/unity.service';
import { TipService } from 'src/app/services/tip.service';
import { ResponseCode } from 'src/app/response/ResponseCode';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  appnames: { name: string, color: string, show: boolean}[] = [];
  isVisible = false;
  deletedProjectName: string;
  constructor( private colorService: ColorService, private unityService: UnityService, private tipService: TipService ) { }

  
  ngOnInit() {
    this.unityService.getWebAppNames().subscribe(  rm => {
      if ( rm.code == ResponseCode.SUCCESS ) {
        for (let i = 0; i < rm.object.length; i++ ) {
          this.appnames.push( { name: rm.object[i], color: this.randomColor(), show: true} );
        }
      } else {
        this.tipService.tip( rm.msg );
      }
    },
    error => {
      this.tipService.tip( error );
    }
    )
  }

  randomColor() {
    return this.colorService.getRandomColor();
  }

  /**
   * 
   * @param name 删除的项目名，会同时删除war和项目文件夹
   */
  deleteProject( name: string) {
    this.unityService.delete( name ).then(
          rm => {
            if( rm.code == ResponseCode.SUCCESS ) {
              this.appnames.forEach( v => {
                  if ( v.name === this.deletedProjectName ) {
                    v.show = false;
                  }
              })
              this.deletedProjectName = null;
              this.tipService.tip( '删除成功' );
            } else {
              this.tipService.tip( rm.msg  );
            }
          },
          () => {
            this.tipService.tip( '网络错误' );
          }
    );
  }

  showModal( name ): void {
    this.deletedProjectName = name;
    this.isVisible = true;
  }

  handleDelete( ): void {
    this.isVisible = false;
    this.deleteProject( this.deletedProjectName );
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
