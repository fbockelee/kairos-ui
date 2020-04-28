// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 12:07:32 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router';
import { MatDialog } from '@angular/material';

// Services imports
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { FraisService } from './../services/frais.service';
import { ApplicationStateService } from './../../../services/application-state.service';

// Models imports
import { Frais } from '../frais.model';

// Components imports
import { DeleteDialogComponent } from './../../../delete-dialog/delete-dialog.component';

import { DatePipe } from '@angular/common';

// Ajout primeng
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'app-frais-list',
  templateUrl: './frais-list.component.html',
  styleUrls: ['./frais-list.component.css'],
  providers: [DatePipe]
})
export class FraisListComponent implements OnInit, OnChanges {

  public title = 'Liste de Fraiss';

  public listOfFraiss: Frais[];


  _filter : string;
  @Input('filter') 
  set filter(value:string) {
	 this._filter = value;
     this.getAllFraiss();
  }

  get filter():string {
	return this._filter
  }

  @Input() createenable?: boolean = true;
  @Input() deleteenable?: boolean = true;
  @Input() updateenable?: boolean = true;
  @Input() incard?: boolean = true;

  private listId = 'FRAIS_COMPONENT_LIST';

  private frais: Frais;

  private columnDefinitions = [
      { def: 'commentaire', showMobile: true, display:'none', index:0},
      { def: 'statut', showMobile: true, display:'none', index:1},
      { def: 'DATEVALIDATION', showMobile: true, display:'none', index:2},
      { def: 'datepaiement', showMobile: true, display:'none', index:3},
      { def: 'paiement', showMobile: true, display:'none', index:4},
      { def: 'fraisid', showMobile: true, display:'table-cell', index:5},
      { def: 'idconsultant', showMobile: true, display:'table-cell', index:6},
      { def: 'codeperiode', showMobile: true, display:'table-cell', index:7},
	];

  constructor(
    private _fraisService: FraisService,
    private _router: Router,
    private _notificationService: NotificationService,
    public dialog: MatDialog,
	private _route: ActivatedRoute) { }

  ngOnInit() {
    // On init get all Fraiss
    //this.getAllFraiss();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Frais list
    EmitterService.get(this.listId).subscribe((data: Frais[]) => this.getAllFraiss());
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
   * Get all Frais using the service FraisService
   */
  getAllFraiss = (): void => {

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

    	this._fraisService.getAll(options).subscribe(
      		(data: Frais[]) => {
        		this.listOfFraiss = data;
      		},
      	error => {
        	this._notificationService.error(
          	'Error',
          	'An error occured when trying to reach the server');
    	});
	}
  }

  editFrais = (fraisid): void => {
    // Navigate to frais form component
    this.goToFraisForm(fraisid);
  }

  deleteFrais = (fraisid): void => {

    const promise = new Promise((resolve, reject) => {
		// Call get service
		this._fraisService.get([fraisid]).subscribe(
        		(frais: Frais) => {
          							this.frais = frais;
          							resolve('done');
        						},
				error => {
          					this._notificationService.error(error.statusText, 'Error delete');
            				reject('error');
        				 });
	})
    .then(() => {
    	// Call delete service
    	this._fraisService.delete(this.frais).subscribe(
      			result => {
       						 // Notify Frais list to refresh
        					EmitterService.get(this.listId).emit(result);

        					this._notificationService.success(
          					'Deleted',
          					`The frais entry with the id='${fraisid}' was deleted successfuly`);
     					  },
      			error => {
        					this._notificationService.error(
          					'Error',
          					'An error occured when trying to reach the server');
      					  });
  	})
  }

  goToFraisForm(fraisid) {
    this._router.navigate(['./frais-form', fraisid]);
  }

  deleteConfirmation = (fraisid) => {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `frais: ${fraisid}`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFrais(fraisid);
      }
    });
  }

}
