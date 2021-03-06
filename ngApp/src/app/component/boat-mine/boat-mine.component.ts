import { Component, OnInit } from '@angular/core';
import { BoatService } from '../../services/boat.service';
import { MatSnackBar } from '@angular/material';
import { Boat, Categories } from '../../models/boat';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';


/*
 * Created on Sun Feb 04 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */

@Component({
  selector: 'app-boat-mine',
  templateUrl: './boat-mine.component.html',
  styleUrls: ['./boat-mine.component.css']
})

export class BoatMineComponent implements OnInit {
  
  tabs: Number;
  boats: any;
  categories: Array<string>;
  selectedValue: string;
  subscription: ISubscription;

  constructor(private boatService: BoatService, private snackBar: MatSnackBar, private router: Router) {
    this.categories = new Categories().getList();
    let bol = this.categories.includes("All");
    if(!bol) {
      this.categories.unshift("All");
      this.selectedValue = "All";
    }
   }

  /**
   * Fecth all boats based on user
   */
  getMyBoats(): void {
    this.subscription = this.boatService.getMyBoats()
    .subscribe(result => {
      this.boats = result;
    }, err => {
      this.snackBar.open('Error in Fetch..', 'Undo', {
        duration: 1000
      });
    });
  }

  ngOnInit() {
    this.tabs = (window.innerWidth <= 400) ? 1 : 5;
    this.getMyBoats();
  }

  /**
   * Get individual boat info
   * @param data string
   */
  getBoatInfo(data: string): void {
    this.router.navigate(['/boat/mine/' + data]);
  }

  /**
   * Direct to boat id which is needed to be edited
   * @param id string
   */
  editBoat(id: string): void {
    this.router.navigate(['./boat/mine/edit/' + id]);
  }

  /**
   * Delete boat based on id
   * @param id string
   */
  delBoat(id: string): void {
    this.subscription = this.boatService.deleteBoat(id)
    .subscribe(result => {
      this.snackBar.open('Deleted Successfully..', 'Undo', {
        duration: 1000
      });
      this.getMyBoats();
    }, err => {
      this.snackBar.open('Error in Delete..', 'Undo', {
        duration: 1000
      });
    });
  }

  /**
   * Get window width to fix responsiveness
   * @param event event
   */
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
      return this.getMyBoats();
    }

    let query = {
      categories: data
    }
    let params = new URLSearchParams();
    for(let key in query){
        params.set(key, query[key]) 
    }
    this.subscription = this.boatService.getMyBoatsByQuery(params.toString())
    .subscribe(result => {
      this.boats = result;
    }, err => {
      this.snackBar.open('Deleted Successfully..', 'Undo', {
        duration: 1000
      });
      this.getMyBoats();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
