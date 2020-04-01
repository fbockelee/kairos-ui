// import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
//import {DropDown} from 'primeng/dropdown';
import {SelectItem} from 'primeng/api';
import { NotificationService } from './services/notification.service';

import { ConsultantService } from './entities/consultant/services/consultant.service';
import { Consultant } from './entities/consultant/consultant.model';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

	listOfConsultants: Consultant[];
	
	public selectedConsultant: Consultant;
	
    constructor(public app: AppComponent,
				private _consultantService: ConsultantService,
				private _notificationService: NotificationService
				) { 

	    const options: any = {params: [
	                    {key: 'sort', value: 'nom'}
	                    ],
	                    notPaged:true
	                  };
	
	    this._consultantService.getAll(options).subscribe(
	      (data: Consultant[]) => {
	        this.listOfConsultants = data;
	        //this.setPage(1);
	      },
	      error => {
	        this._notificationService.error(
	          'Error',
	          'An error occured when trying to reach the server');
	    });	
	}

}