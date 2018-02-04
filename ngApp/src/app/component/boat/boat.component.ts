import { Component, OnInit } from '@angular/core';
import { Categories, Status, Boat } from '../../models/boat';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { BoatService } from '../../services/boat.service';
import { MatSnackBar } from '@angular/material';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.css']
})
export class BoatComponent implements OnInit {
  categories: string[];
  status = Status;
  boatForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private boatService: BoatService,
    private snackBar: MatSnackBar
  ) {
      this.categories = new Categories().getList();
      console.log(this.status);
  }

  ngOnInit() {

    this.boatForm = this.formBuilder.group({
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
    });

    this.boatForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );

  }

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

    this.boatForm.reset();
    Object.keys(this.boatForm.controls).forEach(field => { 
      const control = this.boatForm.get(field);
      control.markAsTouched({ onlySelf: false });
    });
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
    
  }

}
