import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoatService } from '../../services/boat.service';
import { MatSnackBar } from '@angular/material';
import { Lightbox } from 'angular2-lightbox/lightbox.service';
import { LightboxConfig } from 'angular2-lightbox/lightbox-config.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Comments } from '../../models/boat';
import { Observable } from "rxjs/Rx";
import { AuthenticationService } from '../../services/authentication.service';

/*
 * Created on Sun Feb 04 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */


@Component({
  selector: 'app-boat-mine-in',
  templateUrl: './boat-mine-in.component.html',
  styleUrls: ['./boat-mine-in.component.css']
})
export class BoatMineInComponent implements OnInit {
  subscription: any;
  id: string;
  boat: any;
  commentForm: FormGroup;

  private _albums: Array<any> = [];

  constructor(private activatedRoute: ActivatedRoute, 
    private boatService: BoatService, 
    private snackBar: MatSnackBar, 
    private router: Router,
    private _lightbox: Lightbox,
    private _lighboxConfig: LightboxConfig,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) { 
      this._lighboxConfig.fadeDuration = 1;

      console.log(this.authService)
    }

    open(index: number): void {
      // open lightbox
      this._lightbox.open(this._albums, index , { wrapAround: true, showImageNumberLabel: true });
    }

  ngOnInit() {
      // params will return an Observable
      // we need it so we track changes in parameters as this code will be run once at constructor
      this.subscription = this.activatedRoute.params.subscribe(
        (param: any) => {
          this.id = param['id'];

          this.boatService.getMyBoatById(this.id)
            .subscribe(result => {
              if(result == "err") {
                this.snackBar.open('Error in Fetch..', 'Undo', {
                  duration: 1000
                });
              }else {
                this.boat = JSON.parse(result._body);
                this._albums.splice(0, this._albums.length);
                for (let i = 1; i <= this.boat.boatImage.length; i++) {
                  const src = this.boat.boatImage[i-1];
                  const caption = this.boat.name;
                  const album = {
                     src: src
                  };
                  this._albums.push(album);
                }
              }
        }
      );
    })

    this.commentForm = this.formBuilder.group({
      'body': ['', [Validators.required]]
    });

    this.commentForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );

  }

  onSubmit() {
    
    console.log(this.commentForm.value);

    let d  = new Date;

    let myComment = new Comments();
    myComment.body = this.commentForm.value.body;
    myComment.date = (d.getMonth()+1) + "/" + d.getDay() + "/" + d.getFullYear();
    myComment.user = this.authService.user;

    let userData = {
      comments: myComment
    }

    this.boatService.addComment(userData, this.boat._id)
      .subscribe(result => {
        if(result == "err") {
          this.snackBar.open('Something went wrong..', 'Undo', {
            duration: 1000
          });
        }else {
          this.snackBar.open('Added successfully..', 'Undo', {
            duration: 1000
          });
          this.ngOnInit();
        }
      });
  }

}
