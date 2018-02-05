import { Component, OnInit } from '@angular/core';
import { BoatService } from '../../services/boat.service';
import { MatSnackBar } from '@angular/material';
import { Boat } from '../../models/boat';
import { Router } from '@angular/router';


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

  constructor(private boatService: BoatService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.tabs = (window.innerWidth <= 400) ? 1 : 5;

    this.boatService.getMyBoats()
    .subscribe(result => {
      if(result == "err") {
        this.snackBar.open('Error in Fetch..', 'Undo', {
          duration: 1000
        });
      }else {
        this.boats = JSON.parse(result._body);
        console.log(this.boats)
      }
      
    });
  }

  getBoatInfo(data: string): void {
    console.log("data -->> " + data);
    this.router.navigate(['/boat/mine/' + data]);
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
