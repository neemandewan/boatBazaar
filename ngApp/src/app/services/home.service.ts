import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import { Boat } from '../models/boat';

@Injectable()
export class HomeService {
  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
}

getData(): Observable<Boat[]> {
    // add authorization header with jwt token
     let headers = new Headers({ 'x-access-token': this.authenticationService.token });
     let options = new RequestOptions({ headers: headers });

    // get users from api
    return this.http.get('http://localhost:3000/api/auth/boat',options)
        .map((response: Response) => response.json());
}
}