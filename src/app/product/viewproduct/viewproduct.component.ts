import { Component, OnInit, Output, EventEmitter,Inject} from '@angular/core';
import { MatGridListModule, MatButtonModule, MAT_DIALOG_DATA, MatInputModule, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router'
import { ProductService } from '../_services/product.service';
@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  id: any;
  data=[];
  flag:boolean=false;
  
  constructor(
    private route: ActivatedRoute, private router: Router,
    private service: ProductService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      this.id= p['id'];
    });
  
    this.service.getDataById(this.id).subscribe((res)=>{
      console.log("res",res);
      let response=res['docs'];
      this.data=response[0];
      this.flag=true;
    })
  }

  close(): void {
    this.router.navigate(['home/Product']);
  }
}
