import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'modaal',
  template: ` 
  <ckeditor [(ngModel)]="about" (ready)="ckEditorInitialized($event)" [config]="ckEditorConfig" debounce="0"></ckeditor>
  
  
  `,
})
export class ModaalComponent  {

    

constructor(){}

@Output() aboutEmitter = new EventEmitter()

about:string
ckEditorInitialized(event: any) {
    let blockTags = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'li', 'blockquote', 'ul', 'ol', 'table', 'thead', 'tbody', 'tfoot', 'td', 'th'];
    for (let i = 0; i < blockTags.length; i++) {
      event.editor.dataProcessor.writer.lineBreakChars = '';
      event.editor.dataProcessor.writer.setRules(blockTags[i], {
        indent: false,
        breakBeforeOpen: false,
        breakAfterOpen: false,
        breakBeforeClose: false,
        breakAfterClose: false
      });
    }
  }
ckEditorConfig: {} = {
  "language": "en",
  "uiColor": "#ffffff",
  "toolbarGroups": [
    { "name": "basicstyles" },
    { "name": "paragraph", groups: ["list", "align"] },
    { "name": "links" },
    { "name": "clipboard" },
    { "name": "colors" },
    { "name": "styles" },
    { "name": "tools" },
    { "name": "editing" },
  ],
  "removeButtons": "Strike,Subscript,Superscript,Anchor,Cut,Copy,Paste,ShowBlocks,Smiley,Iframe,BGColor,HorizontalRule,SpecialChar,PageBreak,Image,Flash,Styles,Font",
  "extraPlugins": "divarea",
  "removePlugins": "resize",
  "resize_enabled": false
};
    
sendAbout(){
  this.aboutEmitter.emit(this.about)
  console.log('send about')
  console.log(this.about)
}

}
