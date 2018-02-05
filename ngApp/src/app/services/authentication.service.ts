import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    //loginURL: string = '/api/authenticate';
    loginURL: string = 'http://localhost:3000/api/auth/login';

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

<<<<<<< HEAD
    login(email: string, password: string): Observable<boolean> {
        return this.http.post(this.loginURL, {email: email, password: password })
=======
    login(username: string, password: string): Observable<boolean> {
        return this.http.post(this.loginURL, { username: username, email:'test@gmail.com', password: password })
>>>>>>> 62eb1e37c0fb46cf94d0d3a36088c030ae62104a
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}