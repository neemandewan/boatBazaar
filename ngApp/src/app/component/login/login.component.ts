import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";

@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    hide = true;
    

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.emailFormControl.hasError('required') ? 'You must enter a value' :
        this.emailFormControl.hasError('email') ? "Not a valid email" :
        ""
  }


  passwordFormControl = new FormControl('',[Validators.required]);  

  model: any = {};
  loading = false;
  error = '';

  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
        
}

ngOnInit() {
    // reset login status
    this.authenticationService.logout();
}

login() {
    this.loading = true;
    console.log(this.emailFormControl.value);
    console.log(this.passwordFormControl.value);
    this.authenticationService.login(this.emailFormControl.value, this.passwordFormControl.value)
        .subscribe(result => {
            if (result === true) {
                this.router.navigate(['/']);
            } else {
                this.error = 'Username or password is incorrect';
                this.loading = false;
            }
        });
}

export class ButtonOverviewExample {}
