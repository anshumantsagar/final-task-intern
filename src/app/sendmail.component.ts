import { Component } from '@angular/core';
import {FormControl} from '@angular/forms'

@Component({
  selector: 'sendmail',
  template: `  
  
<div>
  <i class="material-icons" (click)="thirdModal.open()" style="font-size:30px">email</i>
  <modal #thirdModal
    [closeOnEscape]="false"
    [hideCloseButton]="false">
      <modal-header>
        <h3>Send Mail</h3>
      </modal-header>
      <modal-content>
        <div>Email:-<tag-input placeholder="enter the email here" [(ngModel)]="email" [validators]="validator" [errorMessages]="errorMsg" ></tag-input></div>
        <div *ngIf="count == true" class="alert alert-success">Email Send</div>
        <div *ngIf="ifNotValid == true" class="alert alert-danger">Enter a valid email </div>
      </modal-content>
      <modal-footer>
      </modal-footer>
  </modal>
</div>
  
  `,
})
export class SendmailComponent  {
email:string;//for getting the email
validator:Array<any> = [this.verifyEmail];//for validating the eamil
errorMsg = { 'verifyEmail@':'enter a valid email id'};//if the entered email is incorrect
  
  //verifying the email by regular expression for validating an email-id
  verifyEmail(control:FormControl){
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); 
    if(!regexp.test(control.value)){
      return {'verifyEmail@':true}
    }
    else {
      return null
    }
  }

}
