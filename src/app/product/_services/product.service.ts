import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

  url: string = 'http://localhost:4001/product';
  constructor(private http: HttpClient) { }

  //get product data
  getProductData(pageIndex,pageSize,filtervalue,sortActive,sortDirection){
    return this.http.get(this.url+'/get/'+pageIndex+'/'+pageSize+'/'+
  sortActive+'/'+sortDirection);
  }
  
  //get specific product data by id
  getDataById(id) {
    console.log("icdvdd",id);
    return this.http.get(this.url + '/getById/' + id);
  }

   //add product data
   saveData(post) {
    return this.http.post(this.url + '/add', post);
  }
  
  //delete product
  deleteProduct(id:any){
    return this.http.delete(this.url + "/delete/" + id);
  }

  public search(pageIndex, pageSize, filterValue): any {
    return this.http.get(this.url + '/search/' + pageIndex + '/' + pageSize + '/' + filterValue);
  }
}
