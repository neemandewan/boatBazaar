
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs/Rx";

/*
 * Created on Mon Feb 05 2018
 * Rajesh Subedi
 * Copyright (c) 2018 Your Company
 */
let p =500;

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})


export class PaymentPageComponent implements OnInit {

  paytype = [
    {value: 'paypal', viewValue: 'PayPal'},
    {value: 'americanexpress', viewValue: 'AmericanExpress'},
    {value: 'visa', viewValue: '  Visa'},
    {value: 'discover', viewValue: 'Discover'}
  ];

  boatname = " Boat Name";
  price =  p;
  totalprice = (p + 10);

   // ptype = PType;
    payForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  

  ngOnInit() {

    this.payForm = this.formBuilder.group({

      'boatname' : this.boatname,
      'price':  this.price,
      'totalprice': this.totalprice,
      'type': ['', [Validators.required]],
      'address': this.formBuilder.group({
      'street': ['', [Validators.required]],
      'city': ['', [Validators.required]],
      'state': ['', [Validators.required]],
      'zipcode': ['', [Validators.required]]
      })
  });

  this.payForm.statusChanges.subscribe(
    (data: any) => console.log(data)
  );
}

onSubmit() {
  console.log(this.payForm.value);

}

}
