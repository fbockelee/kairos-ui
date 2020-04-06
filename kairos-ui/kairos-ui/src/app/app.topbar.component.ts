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

	@Input() listOfConsultants: Consultant[];
	
	// @Input() selectedConsultant: Consultant;
	
	public selectedItem : SelectItem;
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
				//console.log('AppTopBarComponent.EmitterService')
			    //this.selectedItem = this._authService.getCurrentConsultant();
				this.selectedItem = {
										label : this._authService.getCurrentConsultant().nom + ' ' + this._authService.getCurrentConsultant().prenom,
										value : this._authService.getCurrentConsultant()
									};
				//this.selectedItem.label = this._authService.getCurrentConsultant().trigramme;
				//this.selectedItem.value = this._authService.getCurrentConsultant();
				//console.log('AppTopBarComponent.EmitterService rafraichir la dropdown avec '+this.selectedItem.nom)
			}
			else { //result == this._authService.authIdDisconnect
				this.selectedItem = null;
			}
		});		
	}
	
	ngAfterViewInit() {
        //this.parent.currentConsultant = ;
		//console.log('AppTopBarComponent.ngAfterViewInit'); 
    }

    onMenuButtonClick(event: Event) {
        //this.sidebarActive = !this.sidebarActive;

        //event.preventDefault();
		//console.log('AppTopBarComponent.onMenuButtonClick'); 
		this.app.onMenuButtonClick(event);
    }
    onDropdownClick(event: Event) {
        //this.sidebarActive = !this.sidebarActive;

        //event.preventDefault();
		//console.log('AppTopBarComponent.onMenuButtonClick'); 
		//this.app.onMenuButtonClick(event);
		console.log('AppTopBarComponent.onDropdownClick selectedItem=' + this.selectedItem);
		//console.log('AppTopBarComponent.onDropdownClick selectedItem.nom=' + this.selectedItem.nom);
    }

}