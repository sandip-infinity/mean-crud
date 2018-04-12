import { AppComponent } from './../app.component';
import { Component, OnInit, Output, EventEmitter,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tabLinks = [
    {label: 'User', link: 'user'},
    {label: 'Profile', link: 'profile'}
  ];

  constructor(private router:Router,
    public app:AppComponent){
 
  }
  
  ngOnInit() {
    console.log(this.app.profiledata);
  }

Logout(){
  this.router.navigate(['/login']);
}



}
