import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {
  profile: any;
  currentUser: any;
  flag: boolean = false;
  parentRouteId: number;


  constructor(private router: Router, private http: HttpClient,
    private route: ActivatedRoute) {

  }
  ngOnInit() {
    // this.router.navigate(['/login']);
  }

  logout() {
    this.flag = false;
    this.currentUser = " ";
    this.router.navigate(['/login/']);
  }

  passReset() {
    this.router.navigate(['/update']);
  }
}//class