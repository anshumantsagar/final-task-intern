import { Component,Output,EventEmitter } from '@angular/core';
import {ModalModule} from "ng2-modal";
import {ColorPickerService} from 'angular2-color-picker';

@Component({
  selector: 'groupss',
  template: `  
  <div>
    <button class="btn btn-primary" (click)="secondModal.open()">Add Group</button>
    <modal #secondModal
        [closeOnEscape]="false"
        [hideCloseButton]="true">
        <modal-header>
            <h3>Add Group</h3>
        </modal-header>
        <modal-content>
        <div class="form-control" >Name:-<input placeholder="enter group name" [(ngModel)]="groupStruct.name"  ></div>
        <div *ngIf="groupStruct.name == '' && validAlertFlag == true" class="alert alert-danger">Name is Required</div>
        <div *ngIf="toggleFlag" style="position: absolute; margin-right: 20px;" #ignoredInput [colorPicker]="color" 
            [cpDialogDisplay] = "'toggle'"
            (colorPickerChange)="color=$event" 
            [cpPosition] = "'left'"
            [cpToggle] = "true"
            [cpIgnoredElements]="[ignoredButton, ignoredInput]">
        </div>
            <button class="btn btn primary" (click)="toggleColorPicker();lastColor=color"  
            #ignoredButton>select colour</button>
        </modal-content>
        <modal-footer>
            <button class="btn btn secondary" (click)="secondModal.close()">Cancel</button>
            <button class="btn btn-primary" (click)="addGroup()">Save</button>
        </modal-footer>
    </modal>
 </div>
  `,
})

export class GroupssComponent  { 
    @Output() groupEmitter = new EventEmitter()//for emitting the group data
    group:Array<any>=[];//to store groups in array
    toggleFlag = false;//for enabeling and disabling the color picker
    
    //get the group data in a structure
    groupStruct:any={
        name:"",
        color:""
    };
    validAlertFlag:boolean = false; //for setting the validAlertFlag in the validation if true then alert 
    color: string = "#127bdc"; //for getting the value of the color and setting the default value in the color picker
    constructor (private modal:ModalModule, private colorpik:ColorPickerService){}
    
    //add the group data in the array
    addGroup(){
        this.validAlertFlag = true;
        if(this.groupValidation()){
            this.groupStruct.color = this.color
            this.groupEmitter.emit(this.groupStruct)
            this.groupStruct={
                name:"",
                color:""
            }
            this.validAlertFlag = false;
        }
        else{
            return false;
        }
        
    }

    //toToggle the color picker
    toggleColorPicker() {
        this.toggleFlag = !this.toggleFlag
    }

    // for validating the user data
    groupValidation(){
        if(this.groupStruct.name!=""){
            return true;
        }
        else{
            return false;
        }
    }

    //for setting the validAlertFlag to false when pressed cancel 
    cancel(){
        this.validAlertFlag = false
    }



}

