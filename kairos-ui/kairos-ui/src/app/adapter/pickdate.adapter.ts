import { NativeDateAdapter } from '@angular/material';
import { formatDate } from '@angular/common';
import { MatDateFormats } from '@angular/material/core';
// import { Platform } from '@angular/cdk/platform';

export const PICK_FORMATS: MatDateFormats = {
  parse: {dateInput: 'DD/MM/YYYY'},
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'DD/MM/YYYY',
      monthYearA11yLabel: 'MMM YYYY'
  }
};

export class PickDateAdapter extends NativeDateAdapter {

//  constructor(matDateLocale: string, platform: Platform) {
//      super('en-US', platform);
//      fr-FR
//  }

 parse(value: any): Date | null {
        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
          const str = value.split('/');
          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const date = Number(str[0]);
          return new Date(year, month, date);
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
      }

format(date: Date, displayFormat: string): string {
       // console.trace('parse');
       if (displayFormat === 'input') {
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
       } else if (displayFormat == "inputMonth") {
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          return  this._to2digit(month) + '/' + year;
       } else {
           return date.toDateString();
       }
   }

      private _to2digit(n: number) {
       return ('00' + n).slice(-2);
   } 
  // format(date: Date, displayFormat: Object): string {
  //     if (displayFormat === 'input') {
  //         return formatDate(date, 'dd/MM/yyyy', this.locale);
  //     } else {
  //         return date.toDateString();
  //     }
  // }

  

}

