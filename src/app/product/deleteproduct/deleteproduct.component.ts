import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<DeleteproductComponent>
    ,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  confirm() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}