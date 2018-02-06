import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { ObservableInput } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  location: string;
  isLoggedIn$: Observable<boolean>;
  username: string;

  constructor(
    private router: Router, 
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private activatedRout: ActivatedRoute
  ) {
    console.log("MODULE")
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.username = this.authService.user;
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['./login']);
  }

  ngOnDestroy() {
   //
  }
}
