import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }
  private _loggedInUser?: any;
  userExists;

  get loggedInUser() {
      return this._loggedInUser;
  }
  set loggedInUser(user: any) {
      this._loggedInUser = user;
  }

  setusernull() {
    this._loggedInUser = null;
  }

  getusers() {
    // var loginUrl='../assets/loginuser.json';
    const userEndPoint = 'http://localhost:3000/api/users';
    // return this.http.get(loginUrl);
    return this.http.get(userEndPoint);
  }

  validateUser(username: string, password: string) {
    // const userValidationEndpoint = 'http://localhost:3000/api/user/' + username + '/' + password;
    const userValidationEndpoint = `http://localhost:3000/api/user?username=${username}&password=${password}`;
    console.log('going to endpoint: ' + userValidationEndpoint);
    // fetch(userValidationEndpoint).then(data => console.log("something: " + data));
    return this.http.get<any>(userValidationEndpoint);
  }

}
