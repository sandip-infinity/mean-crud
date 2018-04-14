import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DataControlService } from '../data-control.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  _id: any;
  constructor(public snackBar: MatSnackBar, private service:
    DataControlService, public app: AppComponent, private router: Router) { }

  ngOnInit() {
  }

  setNewPass(v1, v2) {
    this._id = this.app.profile[0]._id;
   // console.log("sajcbs", v2)
    this.service.setNewPass(this._id, v2).subscribe((result) => {
      if (result['status'] == 'true') {
        let snackBarRef = this.snackBar.open("", result['info'], {
          duration: 2000,
        });

        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['home/User']);
        });
      }
      else {
        this.snackBar.open("", result['info'], {
          duration: 2000,
        });
      }
    });
  }
}
