import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Categories, Status } from '../../models/boat';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Observable } from "rxjs/Rx";
=======
import { Categories, Status, Boat } from '../../models/boat';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { BoatService } from '../../services/boat.service';
import { MatSnackBar } from '@angular/material';
import { AbstractControl } from '@angular/forms/src/model';

/*
 * Created on Sun Feb 04 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */
>>>>>>> 62eb1e37c0fb46cf94d0d3a36088c030ae62104a

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.css']
})
export class BoatComponent implements OnInit {
<<<<<<< HEAD
  hide: true;

=======
>>>>>>> 62eb1e37c0fb46cf94d0d3a36088c030ae62104a
  categories: string[];
  status = Status;
  boatForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
<<<<<<< HEAD
    private authenticationService: AuthenticationService
=======
    private boatService: BoatService,
    private snackBar: MatSnackBar
>>>>>>> 62eb1e37c0fb46cf94d0d3a36088c030ae62104a
  ) {
      this.categories = new Categories().getList();
      console.log(this.status);
  }

  ngOnInit() {

    this.boatForm = this.formBuilder.group({
<<<<<<< HEAD
      'name': ['', [Validators.required]],
      'categories': ['', [Validators.required]],
      'status': ['', [Validators.required]],
      'image': ['', [Validators.required]],
      'price': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'street': ['', [Validators.required]],
      'city': ['', [Validators.required]],
      'state': ['', [Validators.required]],
      'zipcode': ['', [Validators.required]]
=======
      'name': ['dsadsa', [Validators.required]],
      'categories': ['Ferries', [Validators.required]],
      'status': ['1', [Validators.required]],
      'image': ['sdadasd', [Validators.required]],
      'price': ['90', [Validators.required]],
      'description': ['ewqewe', [Validators.required]],
      'address': this.formBuilder.group({
        'street': ['ewqew', [Validators.required]],
        'city': ['eqwew', [Validators.required]],
        'state': ['ewqew', [Validators.required]],
        'zipcode': ['7888', [Validators.required]]
      })
>>>>>>> 62eb1e37c0fb46cf94d0d3a36088c030ae62104a
    });

    this.boatForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );

  }

<<<<<<< HEAD
  onSubmit() {
    console.log(this.boatForm.value);
=======
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

  onSubmit() {
    
    console.log(this.boatForm.value);

    let myBoat = new Boat();
    myBoat.boatImage = [this.boatForm.value.image];
    myBoat.categories = this.boatForm.value.categories;
    myBoat.name = this.boatForm.value.name;
    myBoat.price = this.boatForm.value.price;
    myBoat.status = parseInt(this.boatForm.value.status);
    myBoat.description = this.boatForm.value.description;
    myBoat.address = this.boatForm.value.address;
    myBoat.comments = [];

    this.boatService.addBoat(myBoat)
      .subscribe(result => {
        this.snackBar.open('Added Successfully..', 'Undo', {
          duration: 1000
        });

        this.resetForm();
        
      });
    
>>>>>>> 62eb1e37c0fb46cf94d0d3a36088c030ae62104a
  }

}
