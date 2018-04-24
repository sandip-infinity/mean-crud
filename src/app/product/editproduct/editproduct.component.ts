import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { ProductService } from '../_services/product.service';
import { MatSnackBar } from '@angular/material';
import { AppComponent } from '/home/infinity/mean-crud/src/app/app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {


  updateproductForm: FormGroup;
  id: any;
  _id;

  constructor(
    public fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private service: ProductService,
    public app:AppComponent,public snackBar: MatSnackBar,private http: HttpClient
  ) {
    this.updateproductForm = fb.group({
      productname: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      supplier: new FormControl(),
      manufacturingDate:new FormControl(),
      deliveryDate:new FormControl()
    });
   }

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      this.id = p['id'];

      this.service.getDataById(this.id).subscribe((response)=>{
        console.log("res",response);
        let res=response['docs'];
        this._id=res[0]._id;
        
        this.updateproductForm.controls['productname'].setValue(res[0].firstname);
        this.updateproductForm.controls['description'].setValue(res[0].lastname);
        this.updateproductForm.controls['price'].setValue(res[0].email);
        this.updateproductForm.controls['supplier'].setValue(res[0].phone);
        this.updateproductForm=response['manufacturingDate'].setValue(res[0].phone);
        this.updateproductForm.controls['deliveryDate'].setValue(res[0].phone);
      })
     
    });

    this.route.params.subscribe(p => {
      //console.log(p['abc']);
      // console.log(p['xyz']);
    });
  }

// onSubmit(){
// console.log(this.updateproductForm.value);
// this.http.post("http://localhost:4001/update",this.updateproductForm.value).subscribe((Result)=>{
//   console.log(Result);
//   // this.router.navigate(['home/product']);

//   this.Dialogref.close(true);
//   // this.Dialogref.close();
// });

// }

// cancle(){
//   this.Dialogref.close();
//   // this.router.navigate(['home/product']);
// }

}
