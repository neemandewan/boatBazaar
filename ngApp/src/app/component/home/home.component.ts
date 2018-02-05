import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Boat } from '../../models/boat';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    boatInfo: Boat[];
    categories : String
    name : String
    description : String
    price : Number

    title = 'I\'m a nested component';

    constructor(private user: HomeService) { 
        this.boatInfo = []    
        console.log(this.boatInfo)   
    }

    ngOnInit() {
        // get boats info from secure api end point
        this.user.getData()
            .subscribe(info => {
                this.boatInfo = info;
                console.log(this.boatInfo)
                console.log("123cdf")
               
            });
           
           
            
           
            
    }

}
