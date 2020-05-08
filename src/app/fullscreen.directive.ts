import {Directive, HostListener} from '@angular/core';
var screenfull = require('screenfull');
 
@Directive({
    selector: '[toggleFullscreen]'
})
export class ToggleFullscreenDirective {
    @HostListener('click') onClick() {
        
        screenfull.toggle();
        
    }
    

}
