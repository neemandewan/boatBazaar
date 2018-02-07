import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import { userRegister } from '../models/userRegistration';
import { Links } from '../app.config';

/*
 * Created on Sun Feb 04 2018
 * Rajesh Subedi
 * Copyright (c) 2018 Your Company
 */


@Injectable()
export class RegisterService {
  hide = true;
  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }
  
  /**
   * Register User
   * @param user userRegister
   */
  addUser(user: userRegister): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'x-access-token': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(Links.regURL, user)
        .map((response: Response)  => response.json());
  }
}
