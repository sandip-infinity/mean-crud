import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tabLinks = [
    {label: 'User', link: 'User'},
    {label: 'Profile', link: 'Profile'}
  ];

  ngOnInit() {
  }
}
