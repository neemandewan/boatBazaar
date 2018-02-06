/*
 * Created on Tue Feb 06 2018
 * Rajesh Subedi
 * @Modified: Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */

export class Purchase {
    boat: string;
    oldUser: string;
    paymentType: string;
    shippingAddress: {
        street: string,
        city: string,
        state: string,
        zipcode: Number
    };
}