import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Links } from '../app.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
 * Created on Mon Feb 05 2018
 * Prabhab Dewan
 * @Modified: Rajesh Subedi
 * @Modified: Niwesh Rai
 * Reference: https://loiane.com/2017/08/angular-hide-navbar-login-page/
 * Copyright (c) 2018 Your Company
 */

@Injectable()
export class AuthenticationService {
    public token: string;
    public user: string;
    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        if(currentUser == null) {
            this.user = null;
        }else {
            this.user = currentUser.email;
            this.loggedIn.next(currentUser.logged);
        }
    }
    
    /**
     * Check Login
     */
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    /**
     * Login feature by Niwesh Rai
     * @param email string
     * @param password string
     */
    login(email: string, password: string): Observable<boolean> {
        return this.http.post(Links.loginURL, {email: email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    this.loggedIn.next(true);

                    // set token property
                    this.token = token;
                    this.user = email;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token, logged: true }));

                    // return true to indicate successful login
                    console.log("true");
                    return true;
                } else {
                    console.log("false");
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    /**
     * Logout feature Updated by Prabhab Dewan
     * LoggedIn  require to show or hide Nav bar
     */
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }
}