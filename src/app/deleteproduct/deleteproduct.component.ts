import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent implements OnInit {
    @Output() onAdd = new EventEmitter<any>(true);
    constructor(public dialogRef: MatDialogRef<DeleteproductComponent>,
      private http:HttpClient,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
 


      ngOnInit() {

      }

  onNoClick() {
    //this.onAdd.emit({ status: 'delete' });

    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }



}
