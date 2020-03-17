// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-03-13 ( Time 17:53:09 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
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

import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-consultant-list',
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.css'],
  providers: [DatePipe]
})
export class ConsultantListComponent implements OnInit, OnChanges {

  public title = 'Liste de Consultants';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Consultant>;

  private listOfConsultants: Consultant[];
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
    public dialog: MatDialog) { }

  ngOnInit() {
    // On init get all Consultants
    this.getAllConsultants();

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
    this._consultantService.getAll({ notPaged: true }).subscribe(
      (data: Consultant[]) => {
        this.listOfConsultants = data;
        this.dataSource = new MatTableDataSource<Consultant>(this.listOfConsultants);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this._notificationService.error(
          'Error',
          'An error occured when trying to reach the server');
    });
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
