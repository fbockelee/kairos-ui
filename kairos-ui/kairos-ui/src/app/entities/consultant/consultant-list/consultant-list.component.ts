// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-20 ( Time 12:58:41 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router';
import { MatDialog } from '@angular/material';

// Services imports
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { ConsultantService } from './../services/consultant.service';
import { ApplicationStateService } from './../../../services/application-state.service';

// Models imports
import { Consultant } from '../consultant.model';

// Components imports
import { DeleteDialogComponent } from './../../../delete-dialog/delete-dialog.component';

import { DatePipe } from '@angular/common';

// Ajout primeng
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'app-consultant-list',
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.css'],
  providers: [DatePipe]
})
export class ConsultantListComponent implements OnInit, OnChanges {

  public title = 'Liste de Consultants';

  public listOfConsultants: Consultant[];


  _filter : string;
  @Input('filter') 
  set filter(value:string) {
	 this._filter = value;
     this.getAllConsultants();
  }

  get filter():string {
	return this._filter
  }

  @Input() createenable?: boolean = true;
  @Input() deleteenable?: boolean = true;
  @Input() updateenable?: boolean = true;
  @Input() incard?: boolean = true;

  private listId = 'CONSULTANT_COMPONENT_LIST';

  private consultant: Consultant;

  private columnDefinitions = [
      { def: 'trigramme', showMobile: true },
      { def: 'nom', showMobile: true },
      { def: 'prenom', showMobile: true },
      { def: 'datedebut', showMobile: true },
      { def: 'datefin', showMobile: true },
	];

  constructor(
    private _consultantService: ConsultantService,
    private _router: Router,
    private _notificationService: NotificationService,
    public dialog: MatDialog,
	private _route: ActivatedRoute) { }

  ngOnInit() {
    // On init get all Consultants
    //this.getAllConsultants();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Consultant list
    EmitterService.get(this.listId).subscribe((data: Consultant[]) => this.getAllConsultants());
  }

  ngOnChanges() { }


  /**
   * Get displayed columns (responsive)
   */
  getDisplayedColumns(): string[] {
	  const isMobile = ApplicationStateService.getIsMobileResolution();
	  return this.columnDefinitions
	    .filter(cd => !isMobile || cd.showMobile)
	    .map(cd => cd.def);
	}

  /**
   * Get all Consultant using the service ConsultantService
   */
  getAllConsultants = (): void => {

	var options:any = { notPaged: true };
	
	if (this.filter) {
		if (this.filter == 'FULL') {
			options = { notPaged: true };
		}
		else {
			var filters = JSON.parse(this.filter);
			options = {params: filters,
						   notPaged: true};
		}

    	this._consultantService.getAll(options).subscribe(
      		(data: Consultant[]) => {
        		this.listOfConsultants = data;
      		},
      	error => {
        	this._notificationService.error(
          	'Error',
          	'An error occured when trying to reach the server');
    	});
	}
  }

  editConsultant = (consultantid): void => {
    // Navigate to consultant form component
    this.goToConsultantForm(consultantid);
  }

  deleteConsultant = (consultantid): void => {

    const promise = new Promise((resolve, reject) => {
		// Call get service
		this._consultantService.get(consultantid).subscribe(
        		(consultant: Consultant) => {
          							this.consultant = consultant;
          							resolve('done');
        						},
				error => {
          					this._notificationService.error(error.statusText, 'Error delete');
            				reject('error');
        				 });
	})
    .then(() => {
    	// Call delete service
    	this._consultantService.delete(this.consultant).subscribe(
      			result => {
       						 // Notify Consultant list to refresh
        					EmitterService.get(this.listId).emit(result);

        					this._notificationService.success(
          					'Deleted',
          					`The consultant entry with the id='${consultantid}' was deleted successfuly`);
     					  },
      			error => {
        					this._notificationService.error(
          					'Error',
          					'An error occured when trying to reach the server');
      					  });
  	})
  }

  goToConsultantForm(consultantid) {
    this._router.navigate(['./consultant-form', consultantid]);
  }

  deleteConfirmation = (consultantid) => {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `consultant: ${consultantid}`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteConsultant(consultantid);
      }
    });
  }

}
