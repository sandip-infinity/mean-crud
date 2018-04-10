import { Component, OnInit, Input ,ViewChild} from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

@Input() onadd:any;



  constructor(public app:AppComponent,
    private router: Router) { }

  ngOnInit() {
    // console.log(this.onadd);

    console.log(this.app.profiledata);
  }

  ok(){
    this.router.navigate(['/home']);
  }


}
