import { Component, OnInit } from '@angular/core';
import { Categories, Status, Boat } from '../../models/boat';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { BoatService } from '../../services/boat.service';
import { MatSnackBar } from '@angular/material';
import { AbstractControl } from '@angular/forms/src/model';

/*
 * Created on Mon Feb 05 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */


@Component({
  selector: 'app-boat-edit',
  templateUrl: './boat-edit.component.html',
  styleUrls: ['./boat-edit.component.css']
})
export class BoatEditComponent implements OnInit {

  categories: string[];
  status = Status;
  boatForm: FormGroup;
  imageForm: FormGroup;
  subscription: any;
  id: string;
  actualBoat: any;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private boatService: BoatService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
      this.categories = new Categories().getList();
  }
  
  /**
   * All initial things need to be done 
   */
  ngOnInit() {

    // params will return an Observable
    // we need it so we track changes in parameters as this code will be run once at constructor
    this.activatedRoute.params.subscribe(
      (param: any) => {
        this.id = param['id'];
        
        this.boatService.getMyBoatById(this.id)
          .subscribe(result => {
            console.log(result)
            if(result == "err") {
              this.snackBar.open('Error in Fetch..', 'Undo', {
                duration: 1000
              });
            }else {
              this.actualBoat = JSON.parse(result._body);
              
              this.boatForm.reset({
                'name': this.actualBoat.name,
                'categories': this.actualBoat.categories,
                'status': this.actualBoat.status,
                'price': this.actualBoat.price,
                'description': this.actualBoat.description,
                'address': {
                  'street': this.actualBoat.address.street,
                  'city': this.actualBoat.address.city,
                  'state': this.actualBoat.address.state,
                  'zipcode': this.actualBoat.address.zipcode
                }
              });
            }
        }
      );
    })
    
    this.boatForm = this.formBuilder.group({
      'name': [null, [Validators.required]],
      'categories': [null, [Validators.required]],
      'status': [null, [Validators.required]],
      //'image': [null, [Validators.required]],
      'price': [null, [Validators.required]],
      'description': [null, [Validators.required]],
      'address': this.formBuilder.group({
        'street': [null, [Validators.required]],
        'city': [null, [Validators.required]],
        'state': [null, [Validators.required]],
        'zipcode': [null, [Validators.required]]
      })
    });

    this.boatForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );

    this.imageForm = this.formBuilder.group({
      'image': ['', [Validators.required]]
    });

    this.imageForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );


  }

  /**
   * Reset form
   */
  resetForm() {
    this.boatForm.reset(this.boatForm.value);
  }

  /**
   * Update form
   * @param myBoat Boat
   */
  updateBoat(myBoat: Boat): void {

    this.boatService.updateBoat(myBoat, this.actualBoat._id)
      .subscribe(result => {
        if(result == "err") {
          this.snackBar.open('Error in Fetch..', 'Undo', {
            duration: 1000
          });
        }else {
          this.snackBar.open('Successfully Done..', 'Undo', {
            duration: 1000
          });
        }
        console.log(JSON.parse(result._body));
      });
  }

  /**
   * Submit form
   */
  onSubmit() {
    
    console.log(this.boatForm.value);
    let myBoat = new Boat();
    myBoat.boatImage = this.actualBoat.boatImage;
    myBoat.categories = this.boatForm.value.categories;
    myBoat.name = this.boatForm.value.name;
    myBoat.price = this.boatForm.value.price;
    myBoat.status = parseInt(this.boatForm.value.status);
    myBoat.description = this.boatForm.value.description;
    myBoat.address = this.boatForm.value.address;
    myBoat.comments = this.actualBoat.comments;

    this.updateBoat(myBoat);
    
  }

  /**
   * Update Image
   */
  updateImage(): void {
    let myBoat = new Boat();
    myBoat.boatImage = this.actualBoat.boatImage;
    myBoat.categories = this.actualBoat.categories;
    myBoat.name = this.actualBoat.name;
    myBoat.price = this.actualBoat.price;
    myBoat.status = parseInt(this.actualBoat.status);
    myBoat.description = this.actualBoat.description;
    myBoat.address = this.actualBoat.address;
    myBoat.comments = this.actualBoat.comments;

    this.updateBoat(myBoat);
  }

  /**
   * Delete Image
   * @param index Number
   */
  delImage(index: Number): void {
    console.log(index)
    this.actualBoat.boatImage.splice(index, 1);
    this.updateImage();
  }

  /**
   * Submit Add image form
   */
  onSubmitImage(): void {
    
     // first check image format and submit 
     let imagecheck = this.imageForm.value.image.split(".");
     let lastelement = imagecheck[imagecheck.length-1];
     let array = ["jpg", "png", "gif", "JPG", "PNG", "GIF"];
 
     let count=false;
 
     array.forEach(arrayelement=>{
       if (lastelement==arrayelement) count=true;
     })
 
     if(!count){
       this.snackBar.open('Image Format Error .....', 'Undo', {
       duration: 1000 });
       return;
   }
    this.actualBoat.boatImage.push(this.imageForm.value.image);
    this.updateImage();
  }
}
