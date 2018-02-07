import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { UserLogin } from '../../models/login';
import { ISubscription } from "rxjs/Subscription";
import { MatSnackBar } from '@angular/material';

//  Created on Mon Feb 05 2018
//  Niwesh Chandra Rai
//  Copyright (c) 2018 Your Company


@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    hide = true;
    loginForm: FormGroup;
    loading = false;
    subscription: ISubscription;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private snackBar: MatSnackBar) {
    }

    /**
     * initial method.. Fetching and validating form
     */
    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            "emailFormControl": new FormControl('', [Validators.required, Validators.email]),
            "passwordFormControl": new FormControl('', [Validators.required])
        });

        this.subscription = this.loginForm.statusChanges.subscribe(
            (data: any) => {}
        );

        // reset login status
        this.authenticationService.logout();
    }
    
    /**
     * Navigate to register
     */
    goToReg():void {
        this.router.navigate(['/register/'])
    }

    // on form submission
    onSubmit() {
        let userLogin = new UserLogin();
        userLogin.email = this.loginForm.value.emailFormControl;
        userLogin.password = this.loginForm.value.passwordFormControl;

        this.subscription = this.authenticationService.login(userLogin.email, userLogin.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/home']);
                } else {
                    this.loading = false;
                }
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