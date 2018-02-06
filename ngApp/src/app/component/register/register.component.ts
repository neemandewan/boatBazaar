import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { Gender, userRegister } from '../../models/userRegistration';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { MatSnackBar } from '@angular/material';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { isNumber } from 'util';


/*
 * Created on Sun Feb 03 2018
 * Rajesh Subedi
 * Copyright (c) 2018 Your Company
 */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

    hide: true;
    gender = Gender;
    userForm: FormGroup;
  
    constructor(
      private formBuilder: FormBuilder, 
      private router: Router, 
      private registerService: RegisterService,
      private authenticationService: AuthenticationService,
      private snackBar: MatSnackBar
    ) { }

    checkIfNumber( passwordKey: any) {
      return (group: FormGroup) => {
        let passwordInput = group.controls[passwordKey];
        let a = passwordInput.value.length;
        if (!Number(passwordInput.value)) {
          return passwordInput.setErrors({notEquivalent: true});
        }
      if (a!= 10) {
        return passwordInput.setErrors({notEquivalent: true});
      } 
        else {
            return passwordInput.setErrors(null);
        }
      }
    }

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
      return (group: FormGroup) => {
        let passwordInput = group.controls[passwordKey],
            passwordConfirmationInput = group.controls[passwordConfirmationKey];
        if (passwordInput.value !== passwordConfirmationInput.value) {
          return passwordConfirmationInput.setErrors({notEquivalent: true})
        }
        else {
            return passwordConfirmationInput.setErrors(null);
        }
      }
    }
  
    ngOnInit() {
  
      this.userForm = this.formBuilder.group({
        'firstname': ['', [Validators.required]],
        'lastname': ['', [Validators.required]],
        'PhoneNumber': ['', [Validators.required]],
        'email': ['', [Validators.required, Validators.email]],
        'password1': ['', [Validators.required]],
        'password2': ['', [Validators.required]],
        'DateOfBirth': ['', [Validators.required]],
        'gender': ['', [Validators.required]],
        'address': this.formBuilder.group({
          'street': ['', [Validators.required]],
          'city': ['', [Validators.required]],
          'state': ['', [Validators.required]],
          'zipcode': ['', [Validators.required]]
        })
      },{validator: [this.checkIfMatchingPasswords('password1', 'password2'), this.checkIfNumber('PhoneNumber')]});
    
      this.userForm.statusChanges.subscribe(
        (data: any) => console.log(data)
      );
  
    }
  
    onSubmit() {
     console.log(this.userForm.value);
      
     let user = new userRegister();

     user.firstname= this.userForm.value.firstname;
     user.lastname= this.userForm.value.lastname;
     user.gender= this.userForm.value.gender;
     user.email= this.userForm.value.email;
     user.password= this.userForm.value.password1;
     user.dob= this.userForm.value.DateOfBirth;
     user.phone= this.userForm.value.PhoneNumber;
     user.address= this.userForm.value.address;
  
	
   this.registerService.addUser(user)
            .subscribe(result => {
                if(result == "err") {
                  this.snackBar.open('Error in Registration..', 'Undo', {
                    duration: 1000
                  });
                }else {
                  this.router.navigate(['./login']);
                }
            });

   }
  

}
