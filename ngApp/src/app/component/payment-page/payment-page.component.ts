import { ActivatedRoute, Router } from '@angular/router';
import { BoatService } from '../../services/boat.service';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { AuthenticationService } from '../../services/authentication.service';
import { PaymentService } from '../../services/payment.service';
import { Purchase } from '../../models/purchase';
import { Boat } from '../../models/boat';
import { ISubscription } from "rxjs/Subscription";

/*
 * Created on Mon Feb 05 2018
 * Rajesh Subedi
 * @Modified Niwesh Rai
 * Copyright (c) 2018 Your Company
 */

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})

export class PaymentPageComponent implements OnInit {

  subscription: ISubscription;
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


  /**
   * Initial method
   * Purchased boat Id related info fetched
   */
  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.id = param['id'];
  
        this.subscription = this.boatService.getMyBoatById(this.id)
          .subscribe(result => {
            this.boat = result;
            this.boatname = this.boat.name;
            this.price = this.boat.price;
            this.totalprice = this.boat.price+10;
            this.boatownerid= this.boat.user;
            this.boatid=this.boat._id;
          }, err => {
            this.snackBar.open('Error in Fetch..', 'Undo', {
              duration: 1000
            });
          })
      })

    this.payForm = this.formBuilder.group({

      'payment_type': ['', [Validators.required]],
      'address': this.formBuilder.group({
        'street': ['', [Validators.required]],
        'city': ['', [Validators.required]],
        'state': ['', [Validators.required]],
        'zipcode': ['', [Validators.required]]
      })

    });

    this.subscription = this.payForm.statusChanges.subscribe(
      (data: any) => {}
    );
  }

  /**
   * Purchase boat and update boat info
   */
  onSubmit() {
    let purchase = new Purchase();
    purchase.boat=this.boatid;
    purchase.oldUser= this.boatownerid;
    purchase.paymentType = this.payForm.value.payment_type;
    purchase.shippingAddress = this.payForm.value.address;

    this.subscription = this.paymentService.addpurchase(purchase)
      .subscribe(result => {
        this.boat.status = 0;
        
        this.subscription = this.boatService.sellBoat(this.boat,this.boatid)
        .subscribe(result => {
          this.router.navigate(['./home']);
        }, err => {
          this.snackBar.open('Error in BoatUpdate..', 'Undo', {
            duration: 1000
          });
        });
      }, err => {
        this.snackBar.open('Error in Purchase..', 'Undo', {
          duration: 1000
        });
      });

  }

  /**
   * Unsubscribe subscription
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
   }

}
