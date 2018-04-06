import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';

import {MatTableDataSource, PageEvent} from '@angular/material';
import {MatDialog} from '@angular/material';
import {MatPaginator, MatSort} from '@angular/material';

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

  displayedColumns = ['id', 'firstname', 'lastname', 'email','phone',
                      'createdDate','updatedDate','actions'];
  dataSource = new MatTableDataSource([]);
  
  length :number;
  pageSize:number=3;
  pageIndex;
  pageSizeOptions = [3,5,10,12];
  _id;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter:ElementRef;
  @ViewChild('input') inputElRef: ElementRef;
  
  constructor(private service:DataControlService,public dialog: MatDialog) { 
    
  }

  ngOnInit() {
     this.paginator.pageSize=3;
    this.loadData(this.paginator);
  }

  loadData(event:PageEvent){
     console.log("paginator :",event.pageSize);
    this.service.getData(event.pageIndex,event.pageSize).subscribe(response=>{
      var res=response['result'];
      console.log("server get all users data :",res);
      this.dataSource=new MatTableDataSource(res['result'] as Array<any>);
      this.length=res['totalRecords'];
      console.log("lengthscxz",this.length);
      this.pageIndex=res['nextPage'];
       this.pageSize=response['pageSize'];
    //   this.data1=this.dataSource.data;
    })
  }

  add(){
    let dialogRef= this.dialog.open( DialogDataExampleDialogComponent,{
      height:'550px',
      width:'500px'
    })
    const sub = dialogRef.componentInstance.onAdd.subscribe((res) => {
    //console.log("f data :",res);
       this.service.saveData(res).subscribe((result)=>{
         console.log("server add result",result)
         if(result['status']=='true'){
          console.log("record inserted successfully. ");
          this.loadData(this.paginator);
         }
         else{
          console.log("insertion failed.");
         }
     });
     });
  }//openDialog

  delete(data:any){
    let dialogRef= this.dialog.open( DeleteComponent,{
      height:'200px',
      width:'500px',
      data:{id:data.id,firstname:data.firstname,lastname:data.lastname,
        email:data.email,phone:data.phone,password:data.password,createdDate:data.createdDate
        ,updatedDate:data.updatedDate,status:data.status}
    })
    const sub = dialogRef.componentInstance.onAdd.subscribe((res) => {
    // console.log("f data :",res);
      if(res.status=='delete'){
        this.service.deleteData(data._id).subscribe((res)=>{
           console.log("delete : server result",res);
           if(res['status']=='true'){
             console.log(res['validation']);
             this.loadData(this.paginator);
           }else{
            console.log(res['validation']);
           }
         });
      }//if
     });
    dialogRef.afterClosed().subscribe();
  }

  edit(data:any){
    this._id=data._id;
    //this.index1=this.dataSource.data.indexOf(data);
    let dialogRef= this.dialog.open(EditDialogComponent,{
      height:'430px',
      width:'500px',
      data:{firstname:data.firstname,lastname:data.lastname,
            email:data.email,phone:data.phone}
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((res) => {
    //  console.log("f data :",res);
      this.service.updateData(res,this._id).subscribe((response)=>{
        console.log("update : server result",response);
        if(response['status']=='true'){
          this.loadData(this.paginator);
           // this.dataSource.data[this.index1]=res;
        }
        else{
            console.log('updation failed');
        }
      });     
    });

    dialogRef.afterClosed().subscribe();
  }//edit

  view(data:any){
    let dialogRef= this.dialog.open(DialogComponent,{
      height:'500px',
      width:'500px',
      data:{id:data.id,firstname:data.firstname,lastname:data.lastname,
        email:data.email,phone:data.phone,password:data.password,createdDate:data.createdDate
        ,updatedDate:data.updatedDate,status:data.status}
    })
  }
  

}//class