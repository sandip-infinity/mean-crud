import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DataControlService } from '../data-control.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  _id: any;

  constructor(public app: AppComponent, public fb: FormBuilder,
    public snackBar: MatSnackBar, private service: DataControlService) {
    this.form = fb.group({
      // id:data.id,
      id: new FormControl(this.app.profile[0].id, [Validators.required]),
      firstname: new FormControl(this.app.profile[0].firstname, [Validators.required]),
      lastname: new FormControl(this.app.profile[0].lastname, [Validators.required]),
      email: new FormControl(this.app.profile[0].email, [Validators.required]),
      phone: new FormControl(this.app.profile[0].phone, [Validators.required]),
      password: new FormControl(this.app.profile[0].phone, [Validators.required])
    });
  }

  ngOnInit() {
    // console.log(this.app.profile)
  }


  openSnackBar() {
    this._id = this.app.profile[0]._id;
    let users = {
      firstname: this.form.value.firstname, lastname: this.form.value.lastname,
      email: this.form.value.email, phone: this.form.value.phone
    };

    this.service.updateData(this._id, users).subscribe((result) => {
      if (result['status'] == 'true') {
        let snackBarRef = this.snackBar.open("", result['info'], {
          duration: 2000,

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
