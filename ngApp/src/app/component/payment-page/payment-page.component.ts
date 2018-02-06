import { ActivatedRoute, Router } from '@angular/router';
import { BoatService } from '../../services/boat.service';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { AuthenticationService } from '../../services/authentication.service';
import { PaymentService } from '../../services/payment.service';
import { Purchase } from '../../models/purchase';

/*
 * Created on Mon Feb 05 2018
 * Rajesh Subedi 
 * Copyright (c) 2018 Your Company
 */

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})

export class PaymentPageComponent implements OnInit {

  subscription: any;
  id: string;
  boat: any;
  boatname = "";
  boatownerid="";
  boatid ="";
  price = null;
  totalprice = null;

  paytype = [
    { value: 'paypal', viewValue: 'PayPal' },
    { value: 'americanexpress', viewValue: 'AmericanExpress' },
    { value: 'visa', viewValue: '  Visa' },
    { value: 'discover', viewValue: 'Discover' }
  ];

  // ptype = PType;
  payForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private boatService: BoatService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private paymentService : PaymentService
  ) { }



  ngOnInit() {

    console.log(1);
    
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.id = param['id'];
  
        this.boatService.getMyBoatById(this.id)
          .subscribe(result => {
            if (result == "err") {
              this.snackBar.open('Error in Fetch..', 'Undo', {
                duration: 1000
              });
            } else {
              this.boat = JSON.parse(result._body);
              console.log(this.boat)
              console.log(this.boat.name);
              this.boatname = this.boat.name;
              this.price = this.boat.price;
              this.totalprice = this.boat.price+10;
              this.boatownerid= this.boat.user;
              this.boatid=this.boat._id;
            }
          })
      })
    
    console.log(2);

    this.payForm = this.formBuilder.group({

      'boatname': this.boatname,
      'price': this.price,
      'totalprice': this.totalprice,
      'payment_type': ['', [Validators.required]],
      'address': this.formBuilder.group({
        'street': ['', [Validators.required]],
        'city': ['', [Validators.required]],
        'state': ['', [Validators.required]],
        'zipcode': ['', [Validators.required]]
      })

    });


    //this.boatname = "this.payForm.value.boatname";

    this.payForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );
  }

  onSubmit() {
    console.log(this.payForm.value);
    console.log(this.boatid);

    let purchase = new Purchase();
    purchase.boat=this.payForm.value.boatname;
    purchase.olduser= this.boatownerid;
    purchase.paymentType = this.payForm.value.payment_type;


    this.paymentService.addpurchase(purchase)
            .subscribe(result => {
                if(result == "err") {
                  this.snackBar.open('Error in Purchase..', 'Undo', {
                    duration: 1000
                  });
                }else {
                 // this.router.navigate(['./home']);
                 this.snackBar.open('Purchase success..', 'Undo', {
                  duration: 1000
                });
                }
            });

  }

}
