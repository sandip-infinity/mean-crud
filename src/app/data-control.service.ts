import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataControlService {

  url:string = 'http://localhost:4001/user';
  constructor(private http:HttpClient) { }
  
  getData(pageIndex,pageSize,filtervalue,sortActive,sortDirection){
    return this.http.get(this.url+'/get/'+pageIndex+'/'+pageSize+'/'+
      sortActive+'/'+sortDirection);
  }

  getDataById(id){
    return this.http.get(this.url+'/getById/'+id);
  }

  saveData(post){
    console.log("post data:",post);
     return this.http.post(this.url+'/add',post);
   }

   deleteData(id) {
     //console.log("delete data",id);
     return this.http.delete(this.url+ "/delete/" +id);
   }

   updateData(id,post) {
     //    console.log("update data",id,post);
    return this.http.put(this.url+'/update/'+id,post);
  }

  setNewPass(id,newPass){
    
    let v={'newPass':newPass};
   // console.log("csdjc",v)
    return this.http.put(this.url+'/setNewPass/'+id,v);
  }

  public search(pageIndex,pageSize,filterValue):any{
    return this.http.get(this.url+'/search/'+pageIndex+'/'+pageSize+'/'+filterValue);
   }
}
