import { Component, OnInit,Output,EventEmitter,ViewChild,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Output() onAdd = new EventEmitter<any>(true);
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    
  }

  onNoClick(){
    this.onAdd.emit({status:'delete'});
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }

}
