import { AppComponent } from './../app.component';
import { Component, OnInit, Output, EventEmitter,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
    
  userForm2:FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private http:HttpClient,
  private route:Router,
public app:AppComponent) { }

  ngOnInit() {
    this.userForm2=this._formBuilder.group({
      email:["",[Validators.required]],
    });
  }


  onSubmit(){
    console.log(this.userForm2.value);
    this.http.post("http://localhost:4001/emailpassword",this.userForm2.value).subscribe(result => {
    
    if(result==false){
      console.log("You enter Wrong phone Number or email");
    }
    else{
      console.log(result);
      //this.onadd.emit(result);
      this.route.navigateByUrl('reset');
    } 
  });

  }
}
