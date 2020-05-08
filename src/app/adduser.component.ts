import { Component,Output,EventEmitter,Input, ViewChild, ElementRef} from '@angular/core';
import {ModalModule} from "ng2-modal";

@Component({
  selector: 'adduser',
  template: `  

<div #openAddEditModal (click)="firstModal.open()"></div>
  <modal #firstModal
  [closeOnOutsideClick]=false
  [closeOnEscape]="false"
  [hideCloseButton]="true">
    <modal-header>
    </modal-header>
    <modal-content>
          <div class="form-control" >Name:-<input [(ngModel)]="userStruct.name"></div>
          <div *ngIf="userStruct.name == '' && validAlertFlag == true" class="alert alert-danger">Name is Required</div>
          <div >
            <div class="form-control" >About:-</div>
            <div *ngIf="ckEditorFlag"><ckeditor [(ngModel)]="userStruct.about" (ready)="ckEditorInitialized($event)" [config]="ckEditorConfig" debounce="0"></ckeditor></div>
          </div>
          <div *ngIf="userStruct.about == '' && validAlertFlag == true" class="alert alert-danger">About is Required</div>
          
          <div>
            Type:-
            <ng-select
                [active]="(userStruct.type)?[userStruct.type]:''"
                [multiple]="false"
                [items]="attendeeType"
                (data)="selectType($event)"
                placeholder="Select Type">
            </ng-select>
          </div>   
          <div *ngIf="userStruct.type == '' && validAlertFlag == true" class="alert alert-danger">Type is Required</div>
          
          <div>
              <ng-select  
                  [active]="userStruct.groups"
                  [multiple]="true"
                  [items]="groups"
                  (data)="selectGroup($event)"
                  placeholder="No group selected">
              </ng-select>
          </div>
          <div *ngIf="userStruct.groups == '' && validAlertFlag == true" class="alert alert-danger">Group is Required</div>
          
          <div><groupss  (groupEmitter)="groupsStore($event)" ></groupss></div>
          <div>.</div>
          <div >
            <button #close class="btn btn-primary" (click)="cancel();firstModal.close()">Cancel</button>
            <button *ngIf="!userStruct.toEdit" class="btn btn-primary" (click)="addUser()">Save</button>
            <button *ngIf="userStruct.toEdit" class="btn btn-primary" (click)="updateUserData()">Update</button>
          </div>
    </modal-content>
    <modal-footer>
    </modal-footer>
  </modal>



  `,
})
export class AdduserComponent  {
  @Input() userData:any//for getting the data for editing
  @Output() userEmitter = new EventEmitter()//for emitting the user[] array in the userdata component when adding the new data
  @Output() userUpdateEmitter = new EventEmitter()//for emitting the users[] array in the userdata when updating
  @ViewChild('openAddEditModal') openModal:ElementRef//for opening the Add/Edit modal
  @ViewChild('close') closeButton:ElementRef//for closing the modal if the data in modal validates and user click on save

  ckEditorFlag = false //for validating enable the ckeditor or not(if false then not)
  validAlertFlag:boolean=false//for the validation in the form if true then show the alert
  //for getting the data in a structured way
  userStruct:any={
      name:"",
      about:"",
      type:"",
      groups:[],
      toEdit:false,
      editIndex:""
  };
  groups:Array<any>=[];//for storing the groups
  //for storing the group data in the desired format
  groupStruct:any={
    id:{name:'',color:''},
    text:''
  }
  attendeeType:Array<string>=['Basic','Plus','VIP'];//attendee type data to show in the add user form
  flagDataCheck:boolean=false//for checking the data if it is to edit

  //ckEditor Configuration
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

  
  constructor(private modal:ModalModule){
    if(localStorage.groups){
        this.groups = JSON.parse(localStorage.groups)
    }
  }

  //for adding the user
  addUser(){
    this.validAlertFlag=true
    if(this.formValidation() && this.userStruct.toEdit==false){
        this.userEmitter.emit(Object.create({data:this.userStruct}))
        this.userStruct={
          name:"",
          about:"",
          type:"",
          groups:[],
          toEdit:false,
          editIndex:""
        };
        this.validAlertFlag=false
        this.closeButton.nativeElement.click()
    }
    else{//if data is not valid
        return false;
    }
  }

  //for updating/editing the user data
  updateUserData(){
    this.validAlertFlag=true
    if(this.userStruct.toEdit==true && this.formValidation()){//if data is for editing
      this.userStruct.editIndex=''
      this.userUpdateEmitter.emit(Object.create({data:this.userStruct}))
      this.validAlertFlag=false
      this.closeButton.nativeElement.click()
      this.validAlertFlag=false
    }
    else{//if the is not valid
        return false;
    }
  }

  //for validating the user form
  formValidation(){
      if(this.userStruct.name!="" && this.userStruct.about!="" && this.userStruct.type!="" && this.userStruct.groups.length>0){
        return true
      }
      else{
        return false
      }
  }

  //ckeditor function
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

  //for resetting the data in the form when closed
  cancel(){
      this.validAlertFlag=false
      this.flagDataCheck = false
      this.userStruct={
          name:"",
          about:"",
          type:"",
          groups:[],
          toEdit:false,
          editIndex:""
      }
  }

  //for selecting the type in the form 
  selectType(event:any){
      this.userStruct.type = event.text
  }
  
  //for getting the group data from the group pop up
  groupsStore(event:any){
      this.groupStruct.id.name = event.name
      this.groupStruct.id.color = event.color
      this.groupStruct.text = event.name
      this.groups.push(this.groupStruct)
      this.groupStruct={
        id:{name:'',color:''},
        text:''
      }
      localStorage.groups = JSON.stringify(this.groups)
  }

  //for selecting the group in the add user form
  selectGroup(event:any){
      this.userStruct.groups = [...event]
  }
  
  //open modal & enabeling the ckEditor
  openAddUser(){
    this.ckEditorFlag = true
    this.openModal.nativeElement.click()
  }

  //for checking if the data is for edit or not
  ngDoCheck(){
    if(!this.flagDataCheck){
        if(this.userData && this.userData.toEdit==true){
        this.userStruct = Object.assign({},this.userData)
        this.userData=''
        this.flagDataCheck=true
        }
    }
  }
}