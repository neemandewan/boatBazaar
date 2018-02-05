import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { UserLogin } from '../../models/login';

@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    hide = true;
    loginForm: FormGroup;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService) {

    }

    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            "emailFormControl": new FormControl('', [Validators.required, Validators.email]),
            "passwordFormControl": new FormControl('', [Validators.required])
        });

        this.loginForm.statusChanges.subscribe(
            (data: any) => console.log(data)
        );

        // reset login status
        this.authenticationService.logout();
    }

    // on form submission
    onSubmit() {
        let userLogin = new UserLogin();
        userLogin.email = this.loginForm.value.emailFormControl;
        userLogin.password = this.loginForm.value.passwordFormControl;

        console.log(userLogin);

        this.authenticationService.login(userLogin.email, userLogin.password)
            .subscribe(result => {
                console.log(result);
                if (result === true) {
                    console.log(this.loginForm.value);
                    this.router.navigate(['/home']);
                } else {
                    console.log("error : waiting");
                    this.loading = false;
                }
            });
    }
}

//export class ButtonOverviewExample { }
