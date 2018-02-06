import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

/*
 * Created on Mon Feb 05 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */


@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {
  sales:any;
  purchases: any;

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService) { 
      
    }
  
  /**
   *  get sales
   */
  getSales(): void {
    this.userService.getSales()
      .subscribe(result => {
        if(result == "err") {
          this.snackBar.open('Something went wrong..', 'Undo', {
            duration: 1000
          });
        }else {
          this.sales = JSON.parse(result._body);
          //console.log(this.sales);
        }
      });
  }

  /**
   *  get purchases
   */
  getPurchases(): void {
    this.userService.getPurchases()
      .subscribe(result => {
        if(result == "err") {
          this.snackBar.open('Something went wrong..', 'Undo', {
            duration: 1000
          });
        }else {
          this.purchases = JSON.parse(result._body);
          //console.log(this.purchases);
        }
      });
  }

  /**
   * get boat information
   * @param id string
   */
  getBoatInfo(id: string): void {
    this.router.navigate(['./home/featured/' + id]);
  }

  ngOnInit()  {
    this.getSales();
    this.getPurchases();
  }

}
