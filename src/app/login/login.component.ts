import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router'
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm:FormGroup;

 constructor( private _formBuilder: FormBuilder,public app:AppComponent,
    // public thisDialogref: MatDialogRef<AppComponent>  ,
    private http:HttpClient,
  private route:Router){}

  
  ngOnInit(){
    this.userForm=this._formBuilder.group({
      phone:["",[Validators.required]],
      password: ["",[Validators.required]]      
    });
  }

  onSubmit(){
    console.log(this.userForm.value);
    this.http.post("http://localhost:4001/user/login",this.userForm.value).subscribe(result => {
      console.log("Valid User",result);
      this.app.profile=result;
      this.app.currentUser=result[0].firstname;
      this.app.flag=true;
      this.route.navigateByUrl('/home');
     },(error)=>{
       console.log("Invalid User");
      });
  }
  register(){
    this.route.navigateByUrl('register');
  }

}
