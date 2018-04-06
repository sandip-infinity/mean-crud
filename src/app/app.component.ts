import { Component,Injectable, ElementRef, OnInit,ViewChild,Output,EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { DialogDataExampleDialogComponent } from './dialog-data-example-dialog/dialog-data-example-dialog.component';


import { DialogComponent } from './dialog/dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable,Subscription} from 'rxjs/Rx';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {PageEvent} from '@angular/material';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subject } from 'rxjs/Subject';
import {Sort} from '@angular/material';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit{
 
  constructor(private router: Router) { }

  ngOnInit() {
   this.router.navigate(['/login']);
    console.log("hello");
  }
}//class


