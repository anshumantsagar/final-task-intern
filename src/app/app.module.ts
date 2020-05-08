import { NgModule, Component }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CKEditorModule } from 'ng2-ckeditor';
import {FormsModule} from '@angular/forms';
import {ModalModule} from "ng2-modal";
import {ColorPickerModule} from 'angular2-color-picker';
import {SelectModule} from 'ng2-select';
import {DndModule} from 'ng2-dnd';
import {TagInputModule} from 'ng2-tag-input'


import { AppComponent }  from './app.component';
import {UserdataComponent} from './userdata.component';
import {ModaalComponent} from './modaal.component';
import {GroupssComponent} from './groupss.components';
import {SendmailComponent} from './sendmail.component';
import {AdduserComponent} from './adduser.component'
import { ToggleFullscreenDirective } from './fullscreen.directive'
import {RouterModule,Routes} from '@angular/router'

const appRoutes: Routes = [
  {path:'sendmail', component: SendmailComponent},
  {path:'groups', component: GroupssComponent},
  {path:'adduser',component:AdduserComponent},
];

@NgModule({
  imports:      [ 
    BrowserModule,
    CKEditorModule,
    FormsModule,
    ModalModule,
    ColorPickerModule,
    SelectModule,
    DndModule.forRoot(),
    TagInputModule,
    RouterModule.forRoot(appRoutes)
  ],

  declarations: [ 
    AppComponent,
    UserdataComponent,
    ModaalComponent,
    GroupssComponent,
    SendmailComponent,
    ToggleFullscreenDirective,
  AdduserComponent],
    
  bootstrap:    [ AppComponent ]
})
export class AppModule {


  
 }

