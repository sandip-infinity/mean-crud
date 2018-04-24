import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { DataControlService } from '../_services/data-control.service';
import { MatSnackBar } from '@angular/material';
import { AppComponent } from '/home/infinity/mean-crud/src/app/app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  form: FormGroup;
  id: any;
  profile:any;
  file:any;
  filename:any;
  _id;
  index:number=0;
  
  constructor(public fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private service: DataControlService,
    public app:AppComponent,public snackBar: MatSnackBar,private http: HttpClient) {
    this.form = fb.group({
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      profile:new FormControl()
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      this.id = p['id'];

      this.service.getDataById(this.id).subscribe((response)=>{
        console.log("res",response);
        let res=response['docs'];
        this._id=res[0]._id;
        
        this.form.controls['firstname'].setValue(res[0].firstname);
        this.form.controls['lastname'].setValue(res[0].lastname);
        this.form.controls['email'].setValue(res[0].email);
        this.form.controls['phone'].setValue(res[0].phone);
        this.filename=response['filename'];
        this.profile=res[0].profile;
      })
     
    });

    this.route.params.subscribe(p => {
      //console.log(p['abc']);
      // console.log(p['xyz']);
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    this.index=1;
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
     // console.log("file info", this.file);
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        let avatar = {
          filename: this.file.name,
          filetype: this.file.type,
          value: reader.result.split(',')[1]
        };
        this.profile="data:image/jpg;base64,"+avatar.value;
        this.filename=avatar.filename;
      };
    }
  }

  fileUpload(){
    let formdata = new FormData();
    formdata.append("avatar", this.file);
    this.http.post("http://localhost:4001/user/uploading", formdata)
      .subscribe((res) => {
        if (res) {
          //console.log("image original name :", res['filename']);
          this.filename=res['filename'];
        }
  });
}//upload

  update(): void {
    if(this.index==1){
      this.fileUpload();
    }

    let users = {
      firstname: this.form.value.firstname, lastname: this.form.value.lastname,
      email: this.form.value.email, phone: this.form.value.phone,
      profile:this.filename
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
          this.app.currentUser=this.profile;
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