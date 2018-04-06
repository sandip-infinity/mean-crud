import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataControlService {

  url:string = 'http://localhost:4001/user';
  constructor(private http:HttpClient) { }
  
  getData(pageIndex,pageSize){
    console.log("bdhascbzx",pageSize)
    return this.http.get(this.url+'/get/'+pageIndex+'/'+pageSize);
  }

  saveData(post){
     //console.log("post data:",post);
     var hello="hello";
     return this.http.post(this.url+'/add',post);
   }

   deleteData(id) {
     //console.log("delete data",id);
     return this.http.delete(this.url+ "/delete/" +id);
   }

   updateData(post,id) {
//    console.log("update data",post);
    return this.http.put(this.url+'/update/'+id,post);
  }
}
