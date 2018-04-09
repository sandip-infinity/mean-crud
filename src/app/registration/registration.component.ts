import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatGridListModule, MatButtonModule, MatInputModule, MatDialog,MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router'
import 'rxjs/add/operator/map';
import { Headers, Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userForm1:FormGroup;

  constructor( private _formBuilder: FormBuilder,
    // public thisDialogref: MatDialogRef<AppComponent>  ,
    private http:HttpClient,
    private router: Router){}

  ngOnInit() {
    this.userForm1=this._formBuilder.group({
    
      fnm:["",[Validators.required]],
      lnm: [""],
      phno:[null,[Validators.required, Validators.pattern('^[1-9][0-9]{9}$')]],
      email:["",[Validators.required]],
      pass:["",[Validators.required]],
      cpass:["",[Validators.required]]       
    })
  }
  onSubmit(){
    console.log(this.userForm1.value);
    this.http.post("http://localhost:4001/user/register",this.userForm1.value).subscribe(result => {
      console.log("register successful");
     });
     this.router.navigate(['/login']);
  }

}
