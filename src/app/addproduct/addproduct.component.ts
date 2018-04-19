import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatGridListModule, MatButtonModule, MatInputModule, MatDialog,MatDialogRef,MatSnackBar,MatDatepicker } from '@angular/material';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router'
import 'rxjs/add/operator/map';
import { Headers, Http, RequestOptions } from '@angular/http';
import { EqualTextValidator } from "angular2-text-equality-validator";
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productForm:FormGroup;

  constructor(private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private http:HttpClient,
    private router: Router) { }

  ngOnInit() {

    this.productForm=this._formBuilder.group({
      pid:[""],
      productname:[""],
      description:[""],
      price:[""],
      supplier:[""],
      manufacturingDate:[],
      deliveryDate:[],
      status:[""]
    });
  }

  onSubmit(){
    // console.log(this.productForm.value);
    this.http.post("http://localhost:4001/addproduct",this.productForm.value).subscribe(result =>{
      //  console.log("Successfully added");
      //  console.log("responce",result);
      this.router.navigate(['/home/product']);
    })
  
  }
  cancle(){
    this.router.navigate(['/home/product']);
  }
}
