// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 12:07:33 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router';
import { MatDialog } from '@angular/material';

// Services imports
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { FraisunitService } from './../services/fraisunit.service';
import { ApplicationStateService } from './../../../services/application-state.service';

// Models imports
import { Fraisunit } from '../fraisunit.model';

// Components imports
import { DeleteDialogComponent } from './../../../delete-dialog/delete-dialog.component';

import { DatePipe } from '@angular/common';

// Ajout primeng
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'app-fraisunit-list',
  templateUrl: './fraisunit-list.component.html',
  styleUrls: ['./fraisunit-list.component.css'],
  providers: [DatePipe]
})
export class FraisunitListComponent implements OnInit, OnChanges {

  public title = 'Liste de Fraisunits';

  public listOfFraisunits: Fraisunit[];


  _filter : string;
  @Input('filter') 
  set filter(value:string) {
	 this._filter = value;
     this.getAllFraisunits();
  }

  get filter():string {
	return this._filter
  }

  @Input() createenable?: boolean = true;
  @Input() deleteenable?: boolean = true;
  @Input() updateenable?: boolean = true;
  @Input() incard?: boolean = true;

  private listId = 'FRAISUNIT_COMPONENT_LIST';

  private fraisunit: Fraisunit;

  private columnDefinitions = [
      { def: 'fraisunitid', showMobile: true, display:'none', index:0},
      { def: 'idconsultant', showMobile: true, display:'none', index:1},
      { def: 'codeperiode', showMobile: true, display:'none', index:2},
      { def: 'codetypefrais', showMobile: true, display:'none', index:3},
      { def: 'datecalendrier', showMobile: true, display:'none', index:4},
      { def: 'idcontrat', showMobile: true, display:'none', index:5},
      { def: 'montantht', showMobile: true, display:'none', index:6},
      { def: 'tva1', showMobile: true, display:'none', index:7},
      { def: 'tva2', showMobile: true, display:'none', index:8},
      { def: 'tva3', showMobile: true, display:'none', index:9},
      { def: 'recu', showMobile: true, display:'none', index:10},
      { def: 'commentaire', showMobile: true, display:'none', index:11},
      { def: 'refact', showMobile: true, display:'none', index:12},
	];

  constructor(
    private _fraisunitService: FraisunitService,
    private _router: Router,
    private _notificationService: NotificationService,
    public dialog: MatDialog,
	private _route: ActivatedRoute) { }

  ngOnInit() {
    // On init get all Fraisunits
    //this.getAllFraisunits();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Fraisunit list
    EmitterService.get(this.listId).subscribe((data: Fraisunit[]) => this.getAllFraisunits());
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
   * Get all Fraisunit using the service FraisunitService
   */
  getAllFraisunits = (): void => {

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

    	this._fraisunitService.getAll(options).subscribe(
      		(data: Fraisunit[]) => {
        		this.listOfFraisunits = data;
      		},
      	error => {
        	this._notificationService.error(
          	'Error',
          	'An error occured when trying to reach the server');
    	});
	}
  }

  editFraisunit = (fraisunitid): void => {
    // Navigate to fraisunit form component
    this.goToFraisunitForm(fraisunitid);
  }

  deleteFraisunit = (fraisunitid): void => {

    const promise = new Promise((resolve, reject) => {
		// Call get service
		this._fraisunitService.get([fraisunitid]).subscribe(
        		(fraisunit: Fraisunit) => {
          							this.fraisunit = fraisunit;
          							resolve('done');
        						},
				error => {
          					this._notificationService.error(error.statusText, 'Error delete');
            				reject('error');
        				 });
	})
    .then(() => {
    	// Call delete service
    	this._fraisunitService.delete(this.fraisunit).subscribe(
      			result => {
       						 // Notify Fraisunit list to refresh
        					EmitterService.get(this.listId).emit(result);

        					this._notificationService.success(
          					'Deleted',
          					`The fraisunit entry with the id='${fraisunitid}' was deleted successfuly`);
     					  },
      			error => {
        					this._notificationService.error(
          					'Error',
          					'An error occured when trying to reach the server');
      					  });
  	})
  }

  goToFraisunitForm(fraisunitid) {
    this._router.navigate(['./fraisunit-form', fraisunitid]);
  }

  deleteConfirmation = (fraisunitid) => {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `fraisunit: ${fraisunitid}`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFraisunit(fraisunitid);
      }
    });
  }

}
