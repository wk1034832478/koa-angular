
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
    
    private colors = ['magenta', 'red', 'volcano', 'orange',
     'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple' ];
    
     public getRandomColor() : string {
        let index = Math.floor( Math.random() * this.colors.length );
        return this.colors[ index ];
    }
}
