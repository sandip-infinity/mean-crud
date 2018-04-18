import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_models/User';
import { Router } from '@angular/router'
import { DataControlService } from '../data-control.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.component.html',
  styleUrls: ['./dialog-data-example-dialog.component.css']
})
export class DialogDataExampleDialogComponent implements OnInit {

  form: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private router: Router,
    public snackBar: MatSnackBar, private service: DataControlService) {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
  }

  save(): void {

    let users = {
      firstname: this.form.value.firstname, lastname: this.form.value.lastname,
      email: this.form.value.email, phone: this.form.value.phone, password: this.
        form.value.password
    };

    this.service.saveData(users).subscribe((result) => {
      // console.log("server add result",result)
      if (result['status'] == 'true') {
        //console.log("record inserted successfully. ");
        //this.loadData(this.paginator);
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

  close() {
    this.router.navigate(['home/user']);
  }
}//class
