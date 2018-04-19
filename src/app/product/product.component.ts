import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatPaginator, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs/Rx';
import { DataControlService } from '../data-control.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DeleteComponent } from '../delete/delete.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DialogDataExampleDialogComponent } from '../dialog-data-example-dialog/dialog-data-example-dialog.component';
import { DeleteproductComponent } from '../deleteproduct/deleteproduct.component';
import { ViewproductComponent } from '../viewproduct/viewproduct.component';
import { EditproductComponent } from '../editproduct/editproduct.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns = ['pid', 'productname', 'description', 'price',
    'supplier','manufacturingDate','deliveryDate', 'actions'];
  dataSource:any = new MatTableDataSource([]);

  length: number;
  pageSize: number = 3;
  pageIndex;
  pageSizeOptions = [3, 5, 10, 12];
  _id; data1;

  flag: boolean = false;
  productname = "";
  productnameControl = new FormControl();
  formCtrlSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('input') inputElRef: ElementRef;

  private subject: any;


  constructor( private service: DataControlService,
     public dialog: MatDialog,
     private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient) { 

      this.route.queryParams.map(params => {
        console.log("Product component route :", this.route);
        console.log("edit hello", params['pid']);
      });

    }

  ngOnInit() {
    this.paginator.pageSize = 3;
    this.sort.active = " ";
    this.sort.direction = "asc";
    this.pageevent(this.paginator);

    this.formCtrlSub = this.productnameControl.valueChanges
    .debounceTime(1500)
    .subscribe(newValue => {
      this.productname = newValue
      if (this.productname == "") {
        console.log("filter value :", this.productname);
        this.dataSource = new MatTableDataSource(this.data1 as Array<any>);
      } else
       {
        console.log("filter value :", this.productname);
        this.service.search1(this.paginator.pageIndex, this.paginator.pageSize, this.productname).subscribe((res) => {
          console.log('filter result :', res);
          this.dataSource = new MatTableDataSource(res as Array<any>);
        });
      }
    });
  }


  addproduct() {
    this.router.navigate(['home/addproduct']);
  }
  deleteproduct(data:any){
     console.log("selected entry:",data._id);
    let dialogRef = this.dialog.open(DeleteproductComponent, {
          height: '200px',
          width: '500px',
          data: {
            pid: data.pid, productname: data.productname, description: data.description,
            price: data.price, supplier: data.supplier, manufacturingDate: data.manufacturingDate,
             deliveryDate: data.deliveryDate,status: data.status,objectId: data._id
          }
        })
        dialogRef.afterClosed().subscribe(
           res =>{console.log(res);
           
            if(res==true)
            {
              this.http.post("http://localhost:4001/delete",data).subscribe((Result)=>{
                console.log("Successfully deleted");
                this.pageevent(this.paginator);
              });
            }
            else{
              console.log("Selected entry is not deleted");
            }
            
          });

  }

   editproduct(data: any) {
    let dialogref=this.dialog.open(EditproductComponent, 
      {  width: '60%',height:'80%',
    data:{ pid: data.pid, productname: data.productname, 
    description: data.description,
    price: data.price, supplier: data.supplier,
     manufacturingDate: data.manufacturingDate,
     deliveryDate: data.deliveryDate,
     status: data.status
    }
     });
     dialogref.afterClosed().subscribe(
      res =>{console.log(res);
        if(res==true){
          this.pageevent(this.paginator);
        }else{
          console.log("entry is not updated");
        }
      });
     
  }

  viewproduct(data:any){
    let dialogref=this.dialog.open(ViewproductComponent, 
      {  width: '60%',height:'80%',
    data:{ pid: data.pid, productname: data.productname, 
    description: data.description,
    price: data.price, supplier: data.supplier,
     manufacturingDate: data.manufacturingDate,
     deliveryDate: data.deliveryDate,
     status: data.status}
     });
  }



pageevent(event: PageEvent){
    console.log("ghf",event);
    this.service.getData1(event.pageIndex, event.pageSize, this.productname, this.sort.active, this.sort.direction).subscribe(response => {
      var res = response['product'];
      console.log("server get all users data :", res);
      this.dataSource = new MatTableDataSource(res['result'] as Array<any>);
      this.length = res['totalRecords'];
      this.pageIndex = res['nextPage'];
      this.pageSize = this.paginator.pageSize;
      this.data1 = this.dataSource.data;
    })
    
  }



  sortData(sort: MatSort) {
    const data = this.dataSource.data;
    //console.log("fhc",this.sort.direction);
    if (!this.sort.active || this.sort.direction == "") {
      //  console.log("ghfjmbkm, ",this.data1);
      this.sort.active = " ";
      this.sort.direction = "asc";
      //let sort={sortActive:" ",sortDirection:" "}
      this.pageevent(this.paginator)
      // this.dataSource.data = this.data1;
      return;
    }

    this.pageevent(this.paginator);
  }

}
