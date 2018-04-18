import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_models/User';
import { Router } from '@angular/router'
import { DataControlService } from '../data-control.service';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
@Component({
  selector: 'app-dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.component.html',
  styleUrls: ['./dialog-data-example-dialog.component.css']
})
export class DialogDataExampleDialogComponent implements OnInit {

  form: FormGroup;
  fileUploadres:any;
  avatar: any;
  file: any;
  flag: boolean = false;
  flag1: boolean = false;
  birthDate:any;
  index:number=0;
  startDate = new Date(1990, 0, 1);
  age:number;
  
  userTypes = [
    {value: 'customer', viewValue: 'Customer'},
    {value: 'employee', viewValue: 'Employee'},
    {value: 'admin', viewValue: 'Admin'}
  ];

  Department = {
    'customer':[1,2],
    'employee':[1,2],
    'admin':[1,2]
  };
  
  constructor(private fb: FormBuilder, private router: Router,
    public snackBar: MatSnackBar, private service: DataControlService,
    private http: HttpClient) {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      date:new FormControl('')
    });
  }//constructor

  ngOnInit() {
  }

  onFileChange(event) {
    let reader = new FileReader();
    this.index=1;
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.avatar = {
          filename: this.file.name,
          filetype: this.file.type,
          value: reader.result.split(',')[1]
        };
        this.flag = true;
     //   console.log("file info :", this.file, " encoded string :", this.avatar);
      };
      
    }
    
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>){
    let event1=event.value.toDateString();
    let todayDate = new Date();
    let todayYear = todayDate.getFullYear();
  
    let selectedDate=new Date(Date.parse(event1));
    this.age=todayYear-(selectedDate.getFullYear());
    this.birthDate=(selectedDate.getMonth()+1)+'/'+selectedDate.getDate()+
                    '/'+selectedDate.getFullYear();
    this.flag1=true;
    console.log("age :",this.age);
  }

  
  save(): void {
    let formdata = new FormData();
    formdata.append("avatar", this.file);
    this.http.post("http://localhost:4001/user/uploading", formdata)
      .subscribe((res) => {
        if (res) {
          console.log("image original name :", res['filename']);
          this.fileUploadres=res['filename'];
          console.log("cxcxz",this.fileUploadres);
          let users = {
            firstname: this.form.value.firstname, 
            lastname: this.form.value.lastname,
            email: this.form.value.email, 
            phone: this.form.value.phone, 
            password: this.form.value.password,
            profile: this.fileUploadres,
            birthDate:this.birthDate,
            age:this.age
          };
          console.log("users :",users);
          this.service.saveData(users)
          .subscribe((result) => {
             console.log("server add result",result)
            if (result['status'] == 'true') {
                let snackBarRef = this.snackBar
                .open("", result['info'], {
                  duration: 2000,
                });
                snackBarRef.afterDismissed().subscribe(() => {
                  this.router.navigate(['home/User']);
                });
            }else
             {
              this.snackBar.open("", result['info'], {
                duration: 2000,
              });
            }
          });//saveData
        }//if res
      });//file upload  
        
        
      
  }//save

  close() {
    this.router.navigate(['home/User']);
  }
}//class
