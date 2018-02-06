import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms/src/form_builder';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';
import { userRegister } from '../../models/userRegistration';

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

    this.userService.getUser()
      .subscribe(result => {
        console.log(result)
        if(result == "err") {
          this.snackBar.open('Error in Fetch..', 'Undo', {
            duration: 1000
          });
        }else {
          console.log(result._body);
          this.user = JSON.parse(result._body);
        }
      });
  }

  ngOnInit() {
    this.getUser();
  }

}
