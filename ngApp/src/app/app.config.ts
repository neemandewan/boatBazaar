/*
 * Created on Sun Feb 04 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */

export class Links {
    static url: string = 'http://localhost:3000';

    static loginURL: string = Links.url + "/api/auth/login";
    static boatURL: string = Links.url + "/api/auth/boat";
    static myBoatURL: string = Links.url + "/api/auth/boat/me";
    static myURL: string = Links.url + "/api/auth/me";
    static regURL: string = Links.url + '/api/auth/register';
    static salesURL: string = Links.url + '/api/auth/purchase/sales';
    static purchaseURL: string = Links.url + '/api/auth/purchase/me';
    static payURL: string = Links.url + '/api/auth/purchase';
}