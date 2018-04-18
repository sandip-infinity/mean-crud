import { Component, OnInit, Output, EventEmitter,Inject} from '@angular/core';
import { MatGridListModule, MatButtonModule, MAT_DIALOG_DATA, MatInputModule, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {


  updateproductForm: FormGroup;

  constructor(
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public Dialogref: MatDialogRef<EditproductComponent>,
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.updateproductForm =this._formBuilder.group({
      pid:[this.data.pid],
      productname:[this.data.productname],
      description:[this.data.description],
      price:[this.data.price],
      supplier:[this.data.supplier],
      manufacturingDate:[this.data.manufacturingDate],
      deliveryDate:[this.data.deliveryDate],
      status:[this.data.status]
    });
  }

onSubmit(){
console.log(this.updateproductForm.value);
this.http.post("http://localhost:4001/update",this.updateproductForm.value).subscribe((Result)=>{
  console.log(Result);
  this.router.navigate(['home/product']);

  this.Dialogref.close(true);
});

}

cancle(){
  this.router.navigate(['home/product']);
}

}
