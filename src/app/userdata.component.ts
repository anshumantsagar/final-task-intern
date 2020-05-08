import { Component,Output,EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import {ModalModule} from "ng2-modal";
import {AdduserComponent} from './adduser.component';

@Component({
  selector: 'userdata',
  styles: [`li {list-style-type: none}`],
  template: `
<!--App Name-->
<div><h1 style = "border: 4px solid grey">App User Data System</h1></div>

<!--User List Table-->
<div>
  <table class="table" style = "border: 4px solid grey">
    <thead class="thead-dark" >
      <tr>
        <th scope="col"  style = "border: 1px solid grey">No.</th>
        <th scope="col" style = "border: 1px solid grey" >Name</th>
        <th scope="col" style = "border: 1px solid grey">Group</th>
        <th scope="col" style = "border: 1px solid grey">Type</th>
        <th scope="col" style = "border: 1px solid grey">Action</th>
      </tr>
    </thead>
    <tbody dnd-sortable-container style = "border: 4px solid grey"  [sortableData]="users">
      <tr *ngFor="let list of users; let indexing = index" (onDropSuccess)="updateIndex($event)" dnd-sortable [sortableIndex]="indexing">
      <th scope="row"  >{{indexing + 1}}</th>
        <td>{{list.name}}</td>
        <td>
          <ul><li *ngFor = "let lists of list.groups"><div data-toggle="tooltip"  data-placement="right" title="{{lists.text}}" [style.background-color]="lists.id.color" [style.width.px]="20" [style.height.px]="20" [style.margin.px]="2"></div></li></ul>
        </td>
        <td>{{list.type}}</td>
        <td>
          <ul>
          <li><i class="material-icons" data-toggle="modal" data-target="#exampleModal" style="font-size:30px" (click)="editUser(indexing);openAddEditUser()">edit</i></li>
          <li><i class="material-icons" data-toggle="modal" data-target="#basicModal" style="font-size:30px" (click)="deleteModal.open();deleteIndex = indexing">delete_forever</i></li>
          <li><sendmail></sendmail></li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!--Add/Edit User Modal-->
<div class="jumbotron" >
  <div>
      <div><h2>Add User</h2><i class="material-icons" too style="cursor:pointer" style="font-size:50px" (click)="openAddEditUser()" >add_box</i></div>
      <adduser  [userData]="userData"  (userEmitter)="userStore($event)" (userUpdateEmitter)="userUpdate($event)" ></adduser>
  </div>
</div>  

<!--Delete Modal-->
<div>
  <modal #deleteModal
    [closeOnOutsideClick]=true>
    <modal-header>
        <h3>Delete User</h3>
    </modal-header>
    <modal-content >
        <div>Are you sure you want to delete {{users[deleteIndex] ? users[deleteIndex].name: null}}</div> 
        <h4>this action can't be undone</h4>
    </modal-content>
    <modal-footer>
        <button class="btn btn-primary" (click)="deleteModal.close()">Cancel</button>
        <button class="btn btn-primary" (click)="deleteUser(indexing);deleteModal.close()">Delete</button>
    </modal-footer>
  </modal>
</div>

<!--FullScreen Button-->
<div class="jumbotron"><h2>Toggle To Fullscreen/Window</h2><i class="material-icons" style="font-size:75px" data-toggle="tooltip"  data-placement="right" title="FullScreen" toggleFullscreen>fullscreen</i></div>
  `,
})

export class UserdataComponent  { 
  @ViewChild('close') private close:ElementRef;
  @ViewChild('closeModal') closeButton:ElementRef;
  @ViewChild(AdduserComponent) addUserComp: AdduserComponent; 
  
  editIndex:number;//for getting the index which data to edit
  deleteIndex:any;//for getting the index which data to delete
  userData:any;//variable for sending the data when called for edit
  groups:Array<any>=[];//to store the group
  users:Array<any>=[];//for storing the users
  dataToEdit:any;//for putting the data while editting
  //for getting the attendee data in desired structure
  userStruct:any={
      name:"",
      about:"",
      type:"",
      groups:[],
      toEdit:false,
      editIndex:""
  };
  //for the attendee type dropdown
  attendeeType:Array<string>=['Basic','Plus','VIP']
  
  constructor(private modal:ModalModule){ 
    if(localStorage.users){
      this.users = JSON.parse(localStorage.users)
    }
  }

  //for editing the data
  editUser(indexing:any){
    this.editIndex = indexing
    this.userStruct = Object.assign({},this.users[indexing])
    this.userStruct["index"] = indexing
    this.userStruct["toEdit"] = true
    this.userData = this.userStruct
  }
  
  //to delete the user
  deleteUser(indexing:number){
      this.users.splice(this.deleteIndex,1)
      localStorage.users = JSON.stringify(this.users)
  }

  //getting new data of the user and storing it into this component 
  userStore(event:any){
    this.users.push(event.data)
    localStorage.users = JSON.stringify(this.users)
  }

  //for updating the user data 
  userUpdate(event:any){
    if(this.userStruct.toEdit==true){
      this.users[this.userStruct.index] = event.data
      this.userStruct.toEdit=false
      localStorage.users = JSON.stringify(this.users)
    }
    else{
      return false;
    }
  }
  
  //opening the add user modal
  openAddEditUser(){
    this.addUserComp.openAddUser()
  }

  //updating the index and storing offline when dropped after dragging
  updateIndex(event:any){
    localStorage.users = JSON.stringify(this.users)
  }

  ngDoCheck(){
    
  }

}
