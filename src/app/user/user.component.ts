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
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns = ['id', 'firstname', 'lastname', 'email', 'phone',
    'createdDate', 'updatedDate', 'actions'];
  dataSource = new MatTableDataSource([]);

  length: number;
  pageSize: number = 3;
  pageIndex;
  pageSizeOptions = [3, 5, 10, 12];
  _id; data1;

  flag: boolean = false;
  firstName = "";
  firstNameControl = new FormControl();
  formCtrlSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('input') inputElRef: ElementRef;

  private sub: any;

  constructor(private service: DataControlService,
    public dialog: MatDialog, private route: ActivatedRoute,
    private router: Router) {
    this.route.queryParams.map(params => {
      // this.sub = params['id'];
      console.log("user component route :", this.route);
      console.log("edit hello", params['id']);
    });
  }

  ngOnInit() {
    this.paginator.pageSize = 3;
    this.sort.active = " ";
    this.sort.direction = "asc";
    this.loadData(this.paginator);


    this.formCtrlSub = this.firstNameControl.valueChanges
      .debounceTime(1500)
      .subscribe(newValue => {
        this.firstName = newValue
        if (this.firstName == "") {
          console.log("filter value :", this.firstName);
          this.dataSource = new MatTableDataSource(this.data1 as Array<any>);
        } else {
          console.log("filter value :", this.firstName);
          this.service.search(this.paginator.pageIndex, this.paginator.pageSize, this.firstName).subscribe((res) => {
            console.log('filter result :', res);
            this.dataSource = new MatTableDataSource(res as Array<any>);
          });
        }
      });

  }//ngoninit

  edit(data: any) {
    // this.router.navigate(['User/edit'],{queryParams: {"id":data.id}});
    //this.router.navigate(['User/edit',data.id,data.id]);
    this.router.navigate(['home/User/edit'], {
      queryParams:
        {
          "id": data.id, "firstname": data.firstname, "lastname": data.lastname
          , "email": data.email, "phone": data.phone, "objectId": data._id
        }
    });
  }//edit

  view(data: any) {
    this.router.navigate(['home/User/view'], {
      queryParams: {
        "id": data.id,
        "firstname": data.firstname, "lastname": data.lastname
        , "email": data.email, "phone": data.phone, "createdDate": data.createdDate
        , "updatedDate": data.updatedDate, "status": data.status
      }
    });
  }

  add() {
    this.router.navigate(['home/User/add']);
  }//add

  delete(data: any) {
    // this.router.navigate(['User/delete'],{queryParams:{"id":data.id}});
    let dialogRef = this.dialog.open(DeleteComponent, {
      height: '200px',
      width: '500px',
      data: {
        id: data.id, firstname: data.firstname, lastname: data.lastname,
        email: data.email, phone: data.phone, password: data.password, createdDate: data.createdDate
        , updatedDate: data.updatedDate, status: data.status
      }
    })
    const sub = dialogRef.componentInstance.onAdd.subscribe((res) => {
      // console.log("f data :",res);
      if (res.status == 'delete') {
        this.service.deleteData(data._id).subscribe((res) => {
          console.log("delete : server result", res);
          if (res['status'] == 'true') {
            console.log(res['validation']);
            this.loadData(this.paginator);
          } else {
            console.log(res['validation']);
          }
        });
      }//if
    });
    dialogRef.afterClosed().subscribe();
  }

  loadData(event: PageEvent) {

    //     console.log("filter :",this.firstName);
    this.service.getData(event.pageIndex, event.pageSize, this.firstName, this.sort.active, this.sort.direction).subscribe(response => {
      var res = response['user'];
      console.log("server get all users data :", res);
      this.dataSource = new MatTableDataSource(res['result'] as Array<any>);
      this.length = res['totalRecords'];
      //console.log("lengthscxz",this.length);
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
      this.loadData(this.paginator)
      // this.dataSource.data = this.data1;
      return;
    }

    this.loadData(this.paginator);
  }

}//class