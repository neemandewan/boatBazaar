import { Pipe, PipeTransform } from '@angular/core';

/*
 * Created on Mon Feb 05 2018
 * Rajesh Subedi
 * Copyright (c) 2018 Your Company
 */


@Pipe({
  name: 'dateCustom'
})
export class DatePipe implements PipeTransform {

  /**
   * Fix time coming from server
   * @param value string
   * @param args any
   */
  transform(value: string, args?: any): string {
    if(value == null) return;
    if(value.includes(" ")) {
      let r =  value.split(" ");
      return r[0] + "" + r[1] + " " + r[2];
    }
    return value.split("T")[0];
  }

}
