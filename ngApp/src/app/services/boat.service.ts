import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import { Boat, Comments } from '../models/boat';
import { Links } from '../app.config';

/*
 * Created on Sun Feb 04 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */

@Injectable()
export class BoatService {

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }

  /**
   * Add Boat
   * @param boat Boat
   */
  addBoat(boat: Boat): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'x-access-token': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(Links.boatURL, boat, options)
        .map((response: Response) => response.json());
  }

  /**
   * Update Boat
   * @param boat Boat
   * @param id string
   */
  updateBoat(boat: Boat, id:string): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'x-access-token': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(Links.boatURL + "/" + id, boat, options)
        .map((response: Response)  => response.json());
  }

  /**
   * Sell Boat
   * @param boat Boat
   * @param id string
   */
  sellBoat(boat: Boat, id:string): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'x-access-token': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(Links.myBoatURL + "/" + id, boat, options)
        .map((response: Response) => response.json());
  }

  /**
   * Delete Boat
   * @param id string
   */
  deleteBoat(id:string): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'x-access-token': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(Links.boatURL + "/" + id, options)
        .map((response: Response) => response.json());
  }

  /**
   * Get Boats by user logged In
   */
  getMyBoats(): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'x-access-token': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(Links.myBoatURL, options)
        .map((response: Response)  => response.json());
    }

    /**
   * Get Boats by user logged In
   */
  getMyBoatsByQuery(data: string): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'x-access-token': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(Links.myBoatURL + "?" + data, options)
        .map((response: Response)  => response.json());
    }

  /**
   * Get particuler boat by boat Id
   * @param id string
   */
  getMyBoatById(id: string): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'x-access-token': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(Links.boatURL + "/" + id, options)
        .map((response: Response)  => response.json());
  }

  /**
   * Add comment to a boat
   * @param data Any
   * @param id string
   */
  addComment(data: any, id: string): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'x-access-token': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(Links.boatURL + "/" + id + "/comment", data, options)
        .map((response: Response) => response.json());
  }

}
