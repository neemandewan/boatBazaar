import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Boat } from '../../models/boat';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Body } from '@angular/http/src/body';
import { AuthenticationService } from '../../services/authentication.service';

//  Created on Mon Feb 05 2018
//  Niwesh Chandra Rai
//  @Modified: Prabhab Dewan
//  Copyright (c) 2018 Your Company

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tabs: Number;
  boatInfo: Boat[];
  boats: any

  constructor(
    private user: HomeService,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.tabs = (window.innerWidth <= 400) ? 1 : 5;
    // get boats info from secure api end point
    this.user.getData()
      .subscribe(result => {
        console.log(result)
        console.log("avc")
        this.boats = result;
        console.log(this.boats)
      });
  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  /**
 * Get individual boat info
 * @param data string
 */
  getBoatInfo(data: string): void {
    console.log("data -->> " + data);
    this.router.navigate(['/home/featured/' + data]);
  }

  onResize(event) {
    const element = event.target.innerWidth;
    console.log(element);


    if (element < 950) {
      this.tabs = 3;
    }

    if (element > 950) {
      this.tabs = 5;
    }

    if (element < 750) {
      this.tabs = 2;
    }

    if (element < 400) {
      this.tabs = 1;
    }
  }


}
