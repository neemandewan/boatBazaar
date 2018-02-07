import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import { Boat } from '../models/boat';
import { Links } from '../app.config';

/*
 * Created on Tue Feb 06 2018
 * Niwesh Chandra Rai
 * Copyright (c) 2018 Your Company
 */


@Injectable()
export class HomeService {
  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
}
    /**
     * Get all boats
     */
    getBoats(): Observable<Boat[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'x-access-token': this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(Links.boatURL,options)
            .map((response: Response) => response.json());
    }

    /**
     * get boats by query
     * @param data string
     */
    getBoatsByQuery(data: string): Observable<Boat[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'x-access-token': this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(Links.boatURL + "?" + data, options)
            .map((response: Response) => response.json());
    }
}