import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { Purchase } from '../models/purchase';
import { Boat } from '../models/boat';
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


  /**
   * add purchase details
   */

  addpurchase(purchase: Purchase): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'x-access-token': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(Links.payURL, purchase, options)
        .map((response: Response)  => response.json());
  }

}



