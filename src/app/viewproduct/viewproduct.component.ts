import { Component, OnInit, Output, EventEmitter,Inject} from '@angular/core';
import { MatGridListModule, MatButtonModule, MAT_DIALOG_DATA, MatInputModule, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  proForm: FormGroup;


  constructor(
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public thisDialogref: MatDialogRef<ViewproductComponent>,
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) { }

  ngOnInit() {
    this.proForm =this._formBuilder.group({
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


  ok(){
    this.thisDialogref.close();
    this.router.navigate(['home/product']);
  }

}
