import { Component, OnInit,Inject,Output,EventEmitter,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import {  FormControl,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions, ResponseType } from '@angular/http';
import { User } from '../_models/User';

@Component({
  selector: 'app-dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.component.html',
  styleUrls: ['./dialog-data-example-dialog.component.css']
})
export class DialogDataExampleDialogComponent implements OnInit {

  form: FormGroup;
  users: User[] = [];
  @Output() onAdd = new EventEmitter<any>(true);

  constructor( public dialogRef: MatDialogRef<DialogDataExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public fb: FormBuilder,public http:HttpClient) {
      this.form = new FormGroup ({
        firstname: new FormControl('',[Validators.required]),
        lastname: new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required]),
        phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
        password: new FormControl('',[Validators.required]),
      });
  }
    ngOnInit() {
    }
    
    onNoClick(): void {
      //  var obj={firstname:this.form.value.firstname,lastname:this.form.value.lastname,
      //   email:this.form.value.email,phone:this.form.value.phone,password:this.form.value.password}
      // console.log("obj :",obj);
      this.users[0]=new User({firstname:this.form.value.firstname,lastname:this.form.value.lastname,
               email:this.form.value.email,phone:this.form.value.phone,password:this.
               form.value.password});
               console.log("obj :",this.users[0]);
      this.onAdd.emit(this.users);
      this.dialogRef.close();
    }

    close(){
      this.dialogRef.close();
    }
}//class
