import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

/*
 * Created on Tue Feb 06 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

    /**
    * Authorization
    */
    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
