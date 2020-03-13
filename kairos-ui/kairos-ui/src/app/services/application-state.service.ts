import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationStateService {

  constructor() {
  }

  static getIsMobileResolution(): boolean {
	    if (window.innerWidth < 768) {
	      return true; 
	    } else {
	      return false;
	    }  
   }
}