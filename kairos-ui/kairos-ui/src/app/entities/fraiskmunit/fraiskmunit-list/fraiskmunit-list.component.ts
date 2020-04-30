// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 16:11:37 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router';
import { MatDialog } from '@angular/material';

// Services imports
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { FraiskmunitService } from './../services/fraiskmunit.service';
import { ApplicationStateService } from './../../../services/application-state.service';

// Models imports
import { Fraiskmunit } from '../fraiskmunit.model';

// Components imports
import { DeleteDialogComponent } from './../../../delete-dialog/delete-dialog.component';

import { DatePipe } from '@angular/common';

// Ajout primeng
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'app-fraiskmunit-list',
  templateUrl: './fraiskmunit-list.component.html',
  styleUrls: ['./fraiskmunit-list.component.css'],
  providers: [DatePipe]
})
export class FraiskmunitListComponent implements OnInit, OnChanges {

  public title = 'Liste de Fraiskmunits';

  public listOfFraiskmunits: Fraiskmunit[];


  _filter : string;
  @Input('filter') 
  set filter(value:string) {
	 this._filter = value;
     this.getAllFraiskmunits();
  }

  get filter():string {
	return this._filter
  }

  @Input() createenable?: boolean = true;
  @Input() deleteenable?: boolean = true;
  @Input() updateenable?: boolean = true;
  @Input() incard?: boolean = true;

  private listId = 'FRAISKMUNIT_COMPONENT_LIST';

  private fraiskmunit: Fraiskmunit;

  private columnDefinitions = [
      { def: 'idcontrat', showMobile: true, display:'none', index:0},
      { def: 'nbkm', showMobile: true, display:'none', index:1},
      { def: 'commentaire', showMobile: true, display:'none', index:2},
      { def: 'tauxkm', showMobile: true, display:'none', index:3},
      { def: 'fraiskmunitid', showMobile: true, display:'table-cell', index:4},
      { def: 'idconsultant', showMobile: true, display:'table-cell', index:5},
      { def: 'codeperiode', showMobile: true, display:'table-cell', index:6},
      { def: 'datecalendrier', showMobile: true, display:'table-cell', index:7},
	];

  constructor(
    private _fraiskmunitService: FraiskmunitService,
    private _router: Router,
    private _notificationService: NotificationService,
    public dialog: MatDialog,
	private _route: ActivatedRoute) { }

  ngOnInit() {
    // On init get all Fraiskmunits
    //this.getAllFraiskmunits();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Fraiskmunit list
    EmitterService.get(this.listId).subscribe((data: Fraiskmunit[]) => this.getAllFraiskmunits());
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
   * Get all Fraiskmunit using the service FraiskmunitService
   */
  getAllFraiskmunits = (): void => {

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

    	this._fraiskmunitService.getAll(options).subscribe(
      		(data: Fraiskmunit[]) => {
        		this.listOfFraiskmunits = data;
      		},
      	error => {
        	this._notificationService.error(
          	'Error',
          	'An error occured when trying to reach the server');
    	});
	}
  }

  editFraiskmunit = (fraiskmunitid): void => {
    // Navigate to fraiskmunit form component
    this.goToFraiskmunitForm(fraiskmunitid);
  }

  deleteFraiskmunit = (fraiskmunitid): void => {

    const promise = new Promise((resolve, reject) => {
		// Call get service
		this._fraiskmunitService.get([fraiskmunitid]).subscribe(
        		(fraiskmunit: Fraiskmunit) => {
          							this.fraiskmunit = fraiskmunit;
          							resolve('done');
        						},
				error => {
          					this._notificationService.error(error.statusText, 'Error delete');
            				reject('error');
        				 });
	})
    .then(() => {
    	// Call delete service
    	this._fraiskmunitService.delete(this.fraiskmunit).subscribe(
      			result => {
       						 // Notify Fraiskmunit list to refresh
        					EmitterService.get(this.listId).emit(result);

        					this._notificationService.success(
          					'Deleted',
          					`The fraiskmunit entry with the id='${fraiskmunitid}' was deleted successfuly`);
     					  },
      			error => {
        					this._notificationService.error(
          					'Error',
          					'An error occured when trying to reach the server');
      					  });
  	})
  }

  goToFraiskmunitForm(fraiskmunitid) {
    this._router.navigate(['./fraiskmunit-form', fraiskmunitid]);
  }

  deleteConfirmation = (fraiskmunitid) => {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `fraiskmunit: ${fraiskmunitid}`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFraiskmunit(fraiskmunitid);
      }
    });
  }

}
