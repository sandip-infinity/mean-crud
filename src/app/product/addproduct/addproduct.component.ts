import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatGridListModule, MatButtonModule, MatInputModule, MatDialog,MatDialogRef,MatSnackBar,MatDatepicker } from '@angular/material';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router'
import 'rxjs/add/operator/map';
import { Headers, Http, RequestOptions } from '@angular/http';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
// import { EqualTextValidator } from "angular2-text-equality-validator";
// import { Moment } from 'moment';
// import * as moment from 'moment';

import { ProductService } from '../_services/product.service'
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
    private router: Router,
  private service:ProductService) { }

  ngOnInit() {

    this.productForm=new FormGroup({
      productname:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      price:new FormControl('',[Validators.required]),
      supplier:new FormControl('',[Validators.required]),
      manufacturingDate:new FormControl('',[Validators.required]),
      deliveryDate:new FormControl('',[Validators.required]),
      status:new FormControl(''),
    });
  }

  addProduct(){
     //console.log(this.productForm.value);
     this.service.saveData(this.productForm.value).subscribe(result =>{
      console.log("server add result", result)
      if (result['status'] == 'true') {
        let snackBarRef = this.snackBar
          .open("", result['info'], {
            duration: 2000,
          });
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/home/Product']);
        });
      } else {
        this.snackBar.open("", result['info'], {
          duration: 2000,
        });
      }
    })
  }
  
  cancel(){
    this.router.navigate(['/home/Product']);
  }
}
