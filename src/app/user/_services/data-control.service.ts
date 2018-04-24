import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserType } from '../_models/UserType';
import { Department } from '../_models/Department';
import { Supervisor } from '../_models/Supervisor';

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
      new UserType(0, 'customer'),
      new UserType(1, 'employee'),
      new UserType(2, 'admin')
    ];
  }

  getDepartment() {
    return [
      new Department(0, 1, 'dept1'),
      new Department(1, 1, 'dept2'),
      new Department(2, 1, 'dept3'),
      new Department(3, 1, 'dept4'),
      new Department(4, 2, 'dept5'),
      new Department(5, 2, 'dept6'),
      new Department(6, 2, 'dept7'),
      new Department(7, 2, 'dept8')
    ];
  }

  getSupervisor() {
    return [
      new Supervisor(0, 'sp1'),
      new Supervisor(1, 'sp2'),
      new Supervisor(2, 'sp3'),
      new Supervisor(3, 'sp4'),
      new Supervisor(4, 'sp5'),
      new Supervisor(5, 'sp6'),
      new Supervisor(6, 'sp7'),
      new Supervisor(7, 'sp8')
    ];
  }

  isEmailRegisterd(email: string) {
    return this.http
      .get(this.url + '/isEmailExist/' + email);
  }

  //get user data
  getData(pageIndex, pageSize, filtervalue, sortActive, sortDirection) {
    return this.http
      .get(this.url + '/get/' + pageIndex + '/' + pageSize + '/' + sortActive 
      + '/' + sortDirection);
  }

  //get specific user data by id
  getDataById(id) {
    return this.http.get(this.url + '/getById/' + id);
  }

  //add user data
  saveData(post) {
    return this.http.post(this.url + '/add', post);
  }

  //delete user data
  deleteData(id) {
    return this.http.delete(this.url + "/delete/" + id);
  }

  //update user data
  updateData(id, post) {
    return this.http.put(this.url + '/update/' + id, post);
  }

  setNewPass(id, newPass) {
    let v = { 'newPass': newPass };
    return this.http.put(this.url + '/setNewPass/' + id, v);
  }

  public search(pageIndex, pageSize, filterValue): any {
    return this.http.get(this.url + '/search/' + pageIndex + '/' + pageSize + '/' + filterValue);
  }
}
