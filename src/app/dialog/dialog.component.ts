import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { DataControlService } from '../data-control.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  id: any;
  data=[];
  flag:boolean=false;

  constructor(private route: ActivatedRoute, private router: Router,
    private service: DataControlService) { }

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
    this.router.navigate(['home/User']);
  }
}