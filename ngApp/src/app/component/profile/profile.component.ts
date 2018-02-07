import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms/src/form_builder';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';
import { userRegister } from '../../models/userRegistration';
import { ISubscription } from 'rxjs/Subscription';

/*
 * Created on Mon Feb 05 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: userRegister;
  subscription: ISubscription;

  constructor(
    //private formBuilder: FormBuilder, 
    private router: Router, 
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Get User
   */
  getUser(): void {

    this.subscription = this.userService.getUser()
      .subscribe(result => {
        this.user = result;
      }, err => {
        this.snackBar.open('Error in Fetch..', 'Undo', {
          duration: 1000
        });
      });
  }

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
