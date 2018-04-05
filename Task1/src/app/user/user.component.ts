import { Component, OnInit } from '@angular/core';

import {MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';

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
  
  _id;

  constructor(private service:DataControlService,public dialog: MatDialog) { 
    this.loadData();
  }

  ngOnInit() {
  }

  add(){
    let dialogRef= this.dialog.open( DialogDataExampleDialogComponent,{
      height:'550px',
      width:'500px'
    })
    const sub = dialogRef.componentInstance.onAdd.subscribe((res) => {
     console.log("f data :",res);
       this.service.saveData(res).subscribe((result)=>{
         if(result['status']=='success'){
          console.log("record inserted successfully. ",result);
          this.loadData();
         }
         else{
          console.log("insertion failed.");
         }
     });
     });
  }//openDialog

  delete(data:any){
    let dialogRef= this.dialog.open( DeleteComponent,{
      height:'450px',
      width:'500px',
      data:{id:data.id,firstname:data.firstname,lastname:data.lastname,
        email:data.email,phone:data.phone,password:data.password,createdDate:data.createdDate
        ,updatedDate:data.updatedDate,status:data.status}
    })
    const sub = dialogRef.componentInstance.onAdd.subscribe((res) => {
    // console.log("f data :",res);
      if(res.status=='delete'){
        this.service.deleteData(data._id).subscribe((res)=>{
          // console.log("delete : server result",res);
           if(res['status']=='deleted'){
             this.loadData();
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
      height:'550px',
      width:'500px',
      data:{firstname:data.firstname,lastname:data.lastname,
            email:data.email,phone:data.phone}
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((res) => {
    //  console.log("f data :",res);
      this.service.updateData(res,this._id).subscribe((response)=>{
        console.log("update : server result",response);
        if(response['status']=='success'){
          this.loadData();
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
      height:'400px',
      width:'500px',
      data:{id:data.id,firstname:data.firstname,lastname:data.lastname,
        email:data.email,phone:data.phone,password:data.password,createdDate:data.createdDate
        ,updatedDate:data.updatedDate,status:data.status}
    })
  }
  loadData(){
    this.service.getData().subscribe(res=>{
      console.log("server get all users data :",res);
      this.dataSource=new MatTableDataSource(res as Array<any>);
    })
  }

}
