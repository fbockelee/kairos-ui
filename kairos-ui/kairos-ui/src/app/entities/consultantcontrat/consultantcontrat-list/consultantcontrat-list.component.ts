// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 16:11:27 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router';
import { MatDialog } from '@angular/material';

// Services imports
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { ConsultantcontratService } from './../services/consultantcontrat.service';
import { ApplicationStateService } from './../../../services/application-state.service';

// Models imports
import { Consultantcontrat } from '../consultantcontrat.model';

// Components imports
import { DeleteDialogComponent } from './../../../delete-dialog/delete-dialog.component';

import { DatePipe } from '@angular/common';

// Ajout primeng
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'app-consultantcontrat-list',
  templateUrl: './consultantcontrat-list.component.html',
  styleUrls: ['./consultantcontrat-list.component.css'],
  providers: [DatePipe]
})
export class ConsultantcontratListComponent implements OnInit, OnChanges {

  public title = 'Liste de Consultantcontrats';

  public listOfConsultantcontrats: Consultantcontrat[];


  _filter : string;
  @Input('filter') 
  set filter(value:string) {
	 this._filter = value;
     this.getAllConsultantcontrats();
  }

  get filter():string {
	return this._filter
  }

  @Input() createenable?: boolean = true;
  @Input() deleteenable?: boolean = true;
  @Input() updateenable?: boolean = true;
  @Input() incard?: boolean = true;

  private listId = 'CONSULTANTCONTRAT_COMPONENT_LIST';

  private consultantcontrat: Consultantcontrat;

  private columnDefinitions = [
      { def: 'taux', showMobile: true, display:'none', index:0},
      { def: 'nbjprev', showMobile: true, display:'none', index:1},
      { def: 'fraisrefact', showMobile: true, display:'none', index:2},
      { def: 'fraisforfait', showMobile: true, display:'none', index:3},
      { def: 'fraisforfaitmnt', showMobile: true, display:'none', index:4},
      { def: 'fraiskmqte', showMobile: true, display:'none', index:5},
      { def: 'fraistype', showMobile: true, display:'none', index:6},
      { def: 'profilcst', showMobile: true, display:'none', index:7},
      { def: 'idconsultant', showMobile: true, display:'none', index:8},
      { def: 'idcontrat', showMobile: true, display:'none', index:9},
      { def: 'datedebut', showMobile: true, display:'none', index:10},
      { def: 'datefin', showMobile: true, display:'none', index:11},
      { def: 'taux', showMobile: true, display:'none', index:12},
      { def: 'nbjprev', showMobile: true, display:'none', index:13},
      { def: 'fraisrefact', showMobile: true, display:'none', index:14},
      { def: 'fraisforfait', showMobile: true, display:'none', index:15},
      { def: 'fraisforfaitmnt', showMobile: true, display:'none', index:16},
      { def: 'fraiskmqte', showMobile: true, display:'none', index:17},
      { def: 'fraistype', showMobile: true, display:'none', index:18},
      { def: 'profilcst', showMobile: true, display:'none', index:19},
      { def: 'idconsultant', showMobile: true, display:'table-cell', index:20},
      { def: 'idcontrat', showMobile: true, display:'table-cell', index:21},
      { def: 'datedebut', showMobile: true, display:'table-cell', index:22},
      { def: 'datefin', showMobile: true, display:'table-cell', index:23},
	];

  constructor(
    private _consultantcontratService: ConsultantcontratService,
    private _router: Router,
    private _notificationService: NotificationService,
    public dialog: MatDialog,
	private _route: ActivatedRoute) { }

  ngOnInit() {
    // On init get all Consultantcontrats
    //this.getAllConsultantcontrats();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Consultantcontrat list
    EmitterService.get(this.listId).subscribe((data: Consultantcontrat[]) => this.getAllConsultantcontrats());
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
   * Get all Consultantcontrat using the service ConsultantcontratService
   */
  getAllConsultantcontrats = (): void => {

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

    	this._consultantcontratService.getAll(options).subscribe(
      		(data: Consultantcontrat[]) => {
        		this.listOfConsultantcontrats = data;
      		},
      	error => {
        	this._notificationService.error(
          	'Error',
          	'An error occured when trying to reach the server');
    	});
	}
  }

  editConsultantcontrat = (idconsultant, idcontrat): void => {
    // Navigate to consultantcontrat form component
    this.goToConsultantcontratForm(idconsultant, idcontrat);
  }

  deleteConsultantcontrat = (idconsultant, idcontrat): void => {

    const promise = new Promise((resolve, reject) => {
		// Call get service
		this._consultantcontratService.get([idconsultant, idcontrat]).subscribe(
        		(consultantcontrat: Consultantcontrat) => {
          							this.consultantcontrat = consultantcontrat;
          							resolve('done');
        						},
				error => {
          					this._notificationService.error(error.statusText, 'Error delete');
            				reject('error');
        				 });
	})
    .then(() => {
    	// Call delete service
    	this._consultantcontratService.delete(this.consultantcontrat).subscribe(
      			result => {
       						 // Notify Consultantcontrat list to refresh
        					EmitterService.get(this.listId).emit(result);

        					this._notificationService.success(
          					'Deleted',
          					`The consultantcontrat entry with the id='${idconsultant}, ${idcontrat}' was deleted successfuly`);
     					  },
      			error => {
        					this._notificationService.error(
          					'Error',
          					'An error occured when trying to reach the server');
      					  });
  	})
  }

  goToConsultantcontratForm(idconsultant, idcontrat) {
    this._router.navigate(['./consultantcontrat-form', idconsultant, idcontrat]);
  }

  deleteConfirmation = (idconsultant, idcontrat) => {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `consultantcontrat: ${idconsultant}, ${idcontrat}`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteConsultantcontrat(idconsultant, idcontrat);
      }
    });
  }

}
