import { Pipe, PipeTransform } from '@angular/core';

/*
 * Created on Tue Feb 06 2018
 * Niwesh Rai
 * Copyright (c) 2018 Your Company
 */

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: Number, args?: any): string {
    if(value === 0) {
      return "Not Available";
    }else if(value == 1) {
      return "Available";
    }else {
      return "Sold";
    }
    
  }

}
