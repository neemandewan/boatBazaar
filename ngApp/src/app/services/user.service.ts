import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';
import { Links } from '../app.config';

/*
 * Created on Mon Feb 05 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */


@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    /**
     * Get user detail
     */
    getUser(): Observable<any> {
        // add authorization header with jwt token
        let headers = new Headers({ 'x-access-token': this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get user from api
        return this.http.get(Links.myURL, options)
            .map((response: Response) => {
                if(response.status == 200) {
                    return response;
                }else {
                    return "err";
                }
            });
    }
}