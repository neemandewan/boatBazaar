import { Component, OnInit } from '@angular/core';
import { Categories, Status, Boat } from '../../models/boat';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { BoatService } from '../../services/boat.service';
import { MatSnackBar } from '@angular/material';
import { AbstractControl } from '@angular/forms/src/model';
import { ISubscription } from "rxjs/Subscription";

/*
 * Created on Sun Feb 04 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.css']
})
export class BoatComponent implements OnInit {
  categories: string[];
  status = Status;
  boatForm: FormGroup;
  subscription: ISubscription;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private boatService: BoatService,
    private snackBar: MatSnackBar
  ) {
      this.categories = new Categories().getList();
  }

  /**
   * Initial things need to be done
   * validation of adding the form
   */
  ngOnInit() {

    this.boatForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'categories': ['Ferries', [Validators.required]],
      'status': [0, [Validators.required]],
      'image': ['', [Validators.required]],
      'price': [null, [Validators.required]],
      'description': ['', [Validators.required]],
      'address': this.formBuilder.group({
        'street': ['', [Validators.required]],
        'city': ['', [Validators.required]],
        'state': ['', [Validators.required]],
        'zipcode': [null, [Validators.required]]
      })
    });

    this.subscription = this.boatForm.statusChanges.subscribe(
      (data: any) => {}
    );

  }

  /**
   * Reset form
   */
  resetForm() {
    // this.boatForm.reset({
    //   'name': '',
    //   'categories': '',
    //   'status': '',
    //   'image': '',
    //   'price': 0,
    //   'description': '',
    //   'address': {
    //     'street': '',
    //     'city': '',
    //     'state': '',
    //     'zipcode': 2257
    //   }
    // });

    this.boatForm.reset(this.boatForm.value);
  }

  /**
   * Submit form
   */
  onSubmit() {
    // first check image format and submit @Rajesh
    let imagecheck = this.boatForm.value.image.split(".");
    let lastelement = imagecheck[imagecheck.length-1];
    let array = ["jpg", "png", "gif", "JPG", "PNG", "GIF"];

    let flag=false;
    for(let i = 0; i < array.length; i++) {
      if (lastelement == array[i]) flag=true;
    }

    if(!flag){
      this.snackBar.open('Image Format Error .....', 'Undo', {
      duration: 1000 });
      return;
    }

    let myBoat = new Boat();
    myBoat.boatImage = [this.boatForm.value.image];
    myBoat.categories = this.boatForm.value.categories;
    myBoat.name = this.boatForm.value.name;
    myBoat.price = this.boatForm.value.price;
    myBoat.status = parseInt(this.boatForm.value.status);
    myBoat.description = this.boatForm.value.description;
    myBoat.address = this.boatForm.value.address;
    myBoat.comments = [];

    this.subscription = this.boatService.addBoat(myBoat)
      .subscribe(result => {
        this.snackBar.open('Successfully Done..', 'Undo', {
          duration: 1000
        });
      }, (err) => {
        this.snackBar.open(err._body, 'Undo', {
          duration: 1000
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
