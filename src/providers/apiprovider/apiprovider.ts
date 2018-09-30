import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiproviderProvider {

  apiUrl = 'https://woo-crud.herokuapp.com/';

  constructor(public http: HttpClient) {
    console.log('Hello ApiproviderProvider Provider');
  }

  getBrand() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'get-todos').subscribe(data => {
          resolve(data);},
          err => {
          console.log(err);
        });
    });
  }

  saveBrand(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'create-todo', data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  delBrand(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.apiUrl+'remove-todo/'+id).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  updateBrand(data) {
    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl+'update-todo', data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

}
