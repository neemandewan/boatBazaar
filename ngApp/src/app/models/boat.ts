import { Comment } from "@angular/compiler";

/*
 * Created on Sat Feb 03 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */

export class Comments {
	body: string;
	date: string;
	user: string;
}

export class Address {
	street: string;
	city: string;
	state: string;
	zipcode: Number;
}

export class Boat {
 	boatImage: string[];
	categories: string;
	name: string;
	price: Number;
	status: Number;
    description: string;
    address: Address;
    comments: Comment[];
}

export class Categories {
    list: string[] = [
        "Electric", "Ferries", "Fireboats", "Dinghies", 
        "Canoes", "Rafts", "Lifeboats", "Kayaks", 
        "Military", "Model", "Steam", "Sail", "River", 
        "Fishing", "Patrol", "Yachts", "Windglider"
    ];

    getList():string[] {
        return this.list;
    }

}

export enum Status {
    notAvailable = 0,
    available = 1,
    sold = 2 
}