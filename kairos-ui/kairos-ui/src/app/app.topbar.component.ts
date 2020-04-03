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

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

	@Input() listOfConsultants: Consultant[];
	
	@Input() selectedConsultant: Consultant;
	
	public selectedItem : Consultant =  this.selectedConsultant;
	
    constructor(public app: AppComponent) {}

	ngOnInit() {
	//this.selectedItem.label  = "optionLabel";
	//this.selectedItem.value = this.selectedConsultant;
	console.log('Résultat selectedConsultant ' + this.selectedConsultant)
	if (this.selectedConsultant)
	  {
		this.selectedItem =  this.selectedConsultant;
	    //label: "optionLabel",
	    // value: this.selectedConsultant.consultantid,
	    //styleClass?: string;
	    //icon?: string;
	    //title?: string;
	    //disabled?: boolean;
		console.log('Résultat selectedItem ' + this.selectedItem); 
  	  }
	else {
		console.log('Résultat selectedConsultant ' + this.selectedConsultant); 
	};
					
	}
	
	ngAfterViewInit() {
        //this.parent.currentConsultant = ;
		console.log('ngAfterViewInit'); 
    }

    onMenuButtonClick(event: Event) {
        //this.sidebarActive = !this.sidebarActive;

        //event.preventDefault();
		console.log('AppTopBarComponent.onMenuButtonClick'); 
		this.app.onMenuButtonClick(event);
    }
}