import { Pipe, PipeTransform } from '@angular/core';

/*
 * Created on Mon Feb 05 2018
 * Prabhab Dewan
 * Copyright (c) 2018 Your Company
 */


@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  /**
   * Fix time coming from server
   * @param value string
   * @param args any
   */
  transform(value: string, args?: any): string {
    if(value == null) return;
    return value.split("00:00:00")[0];
  }

}
