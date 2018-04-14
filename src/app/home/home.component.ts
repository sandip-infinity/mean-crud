import { Component, ViewChild, AfterViewInit, OnInit, TemplateRef, ComponentRef, ViewContainerRef } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { ProfileComponent } from '../profile/profile.component';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  routeLinks: any[];
  activeLinkIndex = 0;
  @ViewChild('container', { read: ViewContainerRef }) dynamicTabPlaceholder;

  constructor(private router: Router) {
    this.routeLinks = [
      { label: 'User', link: 'User' },
      { label: 'Profile', link: 'Profile' }];

    this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(
      tab => router.url.indexOf(tab.link) != -1)
    );
  }//constructor

  ngOnInit() {
  }
}