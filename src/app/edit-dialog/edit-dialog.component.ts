import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { DataControlService } from '../data-control.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  form: FormGroup;
  _id: any;

  constructor(public fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private service: DataControlService,
    public snackBar: MatSnackBar) {
    this.form = fb.group({
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      phone: new FormControl()
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      // console.log("edit",p['id']);
      // console.log(p['firstname']);
      this._id = p['objectId'];
      this.form.controls['firstname'].setValue(p['firstname']);
      this.form.controls['lastname'].setValue(p['lastname']);
      this.form.controls['email'].setValue(p['email']);
      this.form.controls['phone'].setValue(p['phone']);
    });

    this.route.params.subscribe(p => {
      //console.log(p['abc']);
      // console.log(p['xyz']);
    });
  }

  update(): void {
    let users = {
      firstname: this.form.value.firstname, lastname: this.form.value.lastname,
      email: this.form.value.email, phone: this.form.value.phone
    };

    this.service.updateData(this._id, users).subscribe((result) => {
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
    this.router.navigate(['home/User']);
  }

}
