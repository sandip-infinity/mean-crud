import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserType } from './_models/UserType';
import { Department } from './_models/Department';
import { Supervisor } from './_models/Supervisor';

import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class DataControlService {

  url: string = 'http://localhost:4001/user';
  constructor(private http: HttpClient) { }

  getUserType() {
    return [
      new UserType(1, 'customer'),
      new UserType(2, 'employee'),
      new UserType(3, 'admin')
    ];
  }

  getDepartment() {
    return [
      new Department(1, 2, 'dept5'),
      new Department(2, 2, 'dept6'),
      new Department(3, 2, 'dept7'),
      new Department(4, 3, 'dept8'),
      new Department(5, 3, 'dept9'),
      new Department(6, 3, 'dept10')
    ];
  }

  getSupervisor() {
    return [
      new Supervisor(1, 'sp5'),
      new Supervisor(2, 'sp6'),
      new Supervisor(3, 'sp7'),
      new Supervisor(4, 'sp8'),
      new Supervisor(5, 'sp9'),
      new Supervisor(6, 'sp10')
    ];
  }

  isEmailRegisterd(email: string) {
    return this.http
      .get(this.url + '/isEmailExist/' + email);
  }

  getData(pageIndex, pageSize, filtervalue, sortActive, sortDirection) {
    return this.http
      .get(this.url + '/get/' + pageIndex + '/' + pageSize + '/' + sortActive + '/' + sortDirection);
  }

  getDataById(id) {
    return this.http
      .get(this.url + '/getById/' + id);
  }

  saveData(post) {
    return this.http
      .post(this.url + '/add', post);
  }

  deleteData(id) {
    return this.http
      .delete(this.url + "/delete/" + id);
  }

  updateData(id, post) {
    return this
      .http.put(this.url + '/update/' + id, post);
  }

  setNewPass(id, newPass) {
    let v = { 'newPass': newPass };
    return this.http.put(this.url + '/setNewPass/' + id, v);
  }

  public search(pageIndex, pageSize, filterValue): any {
    return this.http.get(this.url + '/search/' + pageIndex + '/' + pageSize + '/' + filterValue);
  }
}
