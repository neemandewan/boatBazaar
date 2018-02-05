/*
 * Created on Sun Feb 04 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */

export class Links {
    static url: string = 'http://localhost:3000';

    static loginURL: string = Links.url + "/api/auth/login";
    static boatURL: string = Links.url + "/api/auth/boat";
    static myBoatURL: string = Links.url + "/api/auth/boat";
    static myURL: string = Links.url + "/api/auth/me";
}