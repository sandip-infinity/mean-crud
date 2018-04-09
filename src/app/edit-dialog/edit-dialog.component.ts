import { Component, OnInit,Inject,Output,EventEmitter } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  form:FormGroup;
  @Output() onAdd = new EventEmitter<any>(true);

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public fb:FormBuilder) { 
      this.form=fb.group({
       // id:data.id,
        firstname: new FormControl(data.firstname,[Validators.required]),
        lastname: new FormControl(data.lastname,[Validators.required]),
        email: new FormControl(data.email,[Validators.required]),
        phone: new FormControl(data.phone,[Validators.required,Validators.minLength(10)]),
      });
    }
    
  ngOnInit() {
  }

  onNoClick(): void {
   // console.log("form value :",this.form.value);
    this.onAdd.emit(this.form.value);
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }
  
}
