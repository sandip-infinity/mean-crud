import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'
import { NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import "rxjs/add/operator/filter";
interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



@Injectable()
export class AppComponent implements OnInit {
  profile: any;
  currentUser: any;
  flag: boolean = false;
  parentRouteId: number;

  public breadcrumbs: IBreadcrumb[];

  constructor(private router: Router, private http: HttpClient,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute) {
      this.breadcrumbs = [];
  }
  ngOnInit() {
    // this.router.navigate(['/login']);
   
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      //set breadcrumbs
      let root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
    });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
  
    //get the child routes
    let children: ActivatedRoute[] = route.children;
  
    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }
  
    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }
  
      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }
  
      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
  
      //append route URL to URL
      url += `/${routeURL}`;
  
      //add breadcrumb
      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);
      console.log("bread :",breadcrumbs)
      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  logout() {
    this.flag = false;
    this.currentUser = " ";
    this.router.navigate(['/login/']);
  }

  passReset() {
    this.router.navigate(['/update']);
  }
}//class