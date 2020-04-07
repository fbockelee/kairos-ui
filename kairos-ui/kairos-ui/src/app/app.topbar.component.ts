import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { Component, Input, OnInit, Output} from '@angular/core';
import { AppComponent } from './app.component';
//import {DropDown} from 'primeng/dropdown';
import {SelectItem} from 'primeng/api';
// import { NotificationService } from './services/notification.service';
// import { AuthService } from './services/auth.service';

// import { ConsultantService } from './entities/consultant/services/consultant.service';
import { Consultant } from './entities/consultant/consultant.model';

import { AuthService } from './services/auth.service';
import { EmitterService } from './services/emitter.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

	@Input() listOfConsultants: SelectItem[];
	
	// @Input() selectedConsultant: Consultant;
	
	//public selectedItem : SelectItem;
	public selectedItem : Object;
	public selectedVrai : Boolean = true;
	
    constructor(public app: AppComponent,
    			private _authService: AuthService,
			   ) {}

	ngOnInit() {
		console.log('AppTopBarComponent.ngOnInit'); 
		
		// Détecter les connections, reconnections
		EmitterService.get(this._authService.authId).subscribe((result: String) => {
			// Rafraichir App
			if ( result == this._authService.authIdConnect) {
				//this.selectedItem = this._authService.getCurrentConsultant().nom + ' ' + this._authService.getCurrentConsultant().prenom;
				var c:Consultant = this._authService.getCurrentConsultant();
				var selectedItems: SelectItem[] = this.listOfConsultants.filter((element, index, array) => {return element['value']['id']==c.consultantid;});
				this.selectedItem = selectedItems[0].value;
									
			}
			else { //result == this._authService.authIdDisconnect
				this.selectedItem = null;
			}
		});		
	}
	
	ngAfterViewInit() {
    }

    onMenuButtonClick(event: Event) {
		this.app.onMenuButtonClick(event);
    }
    onDropdownClick(event: Event) {
		 this.app.onDropdownClick(this.selectedItem);
    }

}