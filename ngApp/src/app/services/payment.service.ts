import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { Boat, Comments } from '../models/boat';
import { Links } from '../app.config';

/*
 * Created on Mon Feb 05 2018
 * Rajesh Subedi
 * Copyright (c) 2018 Your Company
 */

@Injectable()
export class PaymentService {

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }


  addpurchase(payment: Boat, id:string): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'x-access-token': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(Links.boatURL + "/" + id, boat, options)
        .map((response: Response) => {
          if(response.status === 200) {
            return response
          }else {
            return "err";
          }
    });
  }


  
  updateBoat(boat: Boat, id:string): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'x-access-token': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(Links.boatURL + "/" + id, boat, options)
        .map((response: Response) => {
          if(response.status === 200) {
            return response
          }else {
            return "err";
          }
    });
  }

}



