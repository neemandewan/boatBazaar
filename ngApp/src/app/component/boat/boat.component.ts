import { Component, OnInit } from '@angular/core';
import { Categories, Status } from '../../models/boat';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.css']
})
export class BoatComponent implements OnInit {
  hide: true;

  categories: string[];
  status = Status;
  boatForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private authenticationService: AuthenticationService
  ) {
      this.categories = new Categories().getList();
      console.log(this.status);
  }

  ngOnInit() {

    this.boatForm = this.formBuilder.group({
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
    });

    this.boatForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );

  }

  onSubmit() {
    console.log(this.boatForm.value);
  }

}
