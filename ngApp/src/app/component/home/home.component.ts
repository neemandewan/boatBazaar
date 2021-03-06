import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Boat, Categories } from '../../models/boat';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Body } from '@angular/http/src/body';
import { AuthenticationService } from '../../services/authentication.service';
import { ISubscription } from 'rxjs/Subscription';

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
  categories: Array<string>;
  selectedValue: string;
  subscription:ISubscription;

  constructor(
    private user: HomeService,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService) {
      this.categories = new Categories().getList();
      let bol = this.categories.includes("All");
      if(!bol) {
        this.categories.unshift("All");
        this.selectedValue = "All";
      }
    }

  ngOnInit() {
    this.tabs = (window.innerWidth <= 400) ? 1 : 5;
    // get boats info from secure api end point
    this.subscription = this.user.getBoats()
      .subscribe(result => {
        this.boats = result;
      }, (error) => {
        this.snackBar.open('Error in Fetch..', 'Undo', {
          duration: 1000
        });
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
    this.router.navigate(['/home/featured/' + data]);
  }

  onResize(event) {
    const element = event.target.innerWidth;
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

  /**
   * get boats based on categories
   */
  searchByCat(data: string): void {
    if(data === "All") {
      return this.ngOnInit();
    }

    let query = {
      categories: data
    }
    let params = new URLSearchParams();
    for(let key in query){
        params.set(key, query[key]) 
    }
    this.subscription = this.user.getBoatsByQuery(params.toString())
    .subscribe(result => {
      this.boats = result;
    }, err => {
      this.snackBar.open('Error in Fetch..', 'Undo', {
        duration: 1000
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
