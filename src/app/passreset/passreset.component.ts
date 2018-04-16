import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatGridListModule, MatButtonModule, MatInputModule, MatDialog,MatDialogRef,MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router'
import 'rxjs/add/operator/map';
import { Headers, Http, RequestOptions } from '@angular/http';
import { EqualTextValidator } from "angular2-text-equality-validator";

@Component({
  selector: 'app-passreset',
  templateUrl: './passreset.component.html',
  styleUrls: ['./passreset.component.css']
})
export class PassresetComponent implements OnInit {
  
  userForm3:FormGroup;


  constructor(private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private http:HttpClient,
    private router: Router) { }

  ngOnInit() {
    this.userForm3=this._formBuilder.group({
      password:["",[Validators.required]],
      cpassword:["",[Validators.required]],
    });
  }

onSubmit(){
  console.log(this.userForm3.value);
  

}


}
