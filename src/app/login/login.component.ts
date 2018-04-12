import { AppComponent } from './../app.component';
import { Component, OnInit, Output, EventEmitter,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm:FormGroup;

  // @Output() 
  // onadd = new EventEmitter<any>(true);

 constructor( private _formBuilder: FormBuilder,
    // public thisDialogref: MatDialogRef<AppComponent>  ,
    private http:HttpClient,
  private route:Router,
public app:AppComponent ){}

  

  ngOnInit(){
    this.userForm=this._formBuilder.group({
      phone:["",[Validators.required,Validators.maxLength(10)]],
      password: ["",[Validators.required]]      
    });
  }

  onSubmit(){
    console.log(this.userForm.value);
    this.http.post("http://localhost:4001/login",this.userForm.value).subscribe(result => {

   if(result==false)
   {
    console.log("Invalid User");
    this.route.navigateByUrl('login'); 
   }
   else{   
    console.log(result);
    console.log("Valid User");
    this.app.profiledata=result;
    this.route.navigateByUrl('home');
       }  
    });

  }
  register(){
    this.route.navigateByUrl('register');
  }

  gorget(){
    this.route.navigateByUrl('forget');  
  }


}
