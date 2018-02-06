
/*
* Created on Sat Feb 04 2018
* Rajesh Subedi
* Copyright (c) 2018 Your Company
*/

export class Address {
	street: string;
	city: string;
	state: string;
	zipcode: Number;
}

export class userRegister {
    firstname: string;
    lastname: string;
    gender: string;
    email: string;
    password: string;
    dob: string;
    phone: Number;
    address: Address;
}

export enum Gender {
    male="male",
    female="female",
    others="others"
}