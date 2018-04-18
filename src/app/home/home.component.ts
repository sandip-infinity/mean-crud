import { AppComponent } from './../app.component';
import { Component, OnInit, Output, EventEmitter,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router'

import { AfterViewInit, TemplateRef, ComponentRef, ViewContainerRef } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { ProfileComponent } from '../profile/profile.component';
import { Observable } from 'rxjs/Observable';
import { RouterModule,} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tabLinks = [
    {label: 'User', link: 'user'},
    {label: 'Profile', link: 'profile'},
    {label: 'Product', link: 'product'}
  ];
  routeLinks: any[];
  activeLinkIndex = 0;
  @ViewChild('container', { read: ViewContainerRef }) dynamicTabPlaceholder;

  constructor(private router: Router,
    public app:AppComponent) {
    this.routeLinks = [
      { label: 'User', link: 'user' },
      { label: 'Profile', link: 'profile' },
      { label: 'Product', link: 'product' }
    ];

    this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(
      tab => router.url.indexOf(tab.link) != -1)
    );
  }
  
  ngOnInit() {
    console.log(this.app.profiledata);
  }

Logout(){
  this.router.navigate(['/login']);
}



}
