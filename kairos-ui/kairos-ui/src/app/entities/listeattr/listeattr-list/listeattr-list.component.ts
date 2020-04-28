// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 12:07:36 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router';
import { MatDialog } from '@angular/material';

// Services imports
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { ListeattrService } from './../services/listeattr.service';
import { ApplicationStateService } from './../../../services/application-state.service';

// Models imports
import { Listeattr } from '../listeattr.model';

// Components imports
import { DeleteDialogComponent } from './../../../delete-dialog/delete-dialog.component';

import { DatePipe } from '@angular/common';

// Ajout primeng
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'app-listeattr-list',
  templateUrl: './listeattr-list.component.html',
  styleUrls: ['./listeattr-list.component.css'],
  providers: [DatePipe]
})
export class ListeattrListComponent implements OnInit, OnChanges {

  public title = 'Liste de Listeattrs';

  public listOfListeattrs: Listeattr[];


  _filter : string;
  @Input('filter') 
  set filter(value:string) {
	 this._filter = value;
     this.getAllListeattrs();
  }

  get filter():string {
	return this._filter
  }

  @Input() createenable?: boolean = true;
  @Input() deleteenable?: boolean = true;
  @Input() updateenable?: boolean = true;
  @Input() incard?: boolean = true;

  private listId = 'LISTEATTR_COMPONENT_LIST';

  private listeattr: Listeattr;

  private columnDefinitions = [
	];

  constructor(
    private _listeattrService: ListeattrService,
    private _router: Router,
    private _notificationService: NotificationService,
    public dialog: MatDialog,
	private _route: ActivatedRoute) { }

  ngOnInit() {
    // On init get all Listeattrs
    //this.getAllListeattrs();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Listeattr list
    EmitterService.get(this.listId).subscribe((data: Listeattr[]) => this.getAllListeattrs());
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
   * Get all Listeattr using the service ListeattrService
   */
  getAllListeattrs = (): void => {

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

    	this._listeattrService.getAll(options).subscribe(
      		(data: Listeattr[]) => {
        		this.listOfListeattrs = data;
      		},
      	error => {
        	this._notificationService.error(
          	'Error',
          	'An error occured when trying to reach the server');
    	});
	}
  }

  editListeattr = (nomliste, codeelement, nomattribut): void => {
    // Navigate to listeattr form component
    this.goToListeattrForm(nomliste, codeelement, nomattribut);
  }

  deleteListeattr = (nomliste, codeelement, nomattribut): void => {

    const promise = new Promise((resolve, reject) => {
		// Call get service
		this._listeattrService.get([nomliste, codeelement, nomattribut]).subscribe(
        		(listeattr: Listeattr) => {
          							this.listeattr = listeattr;
          							resolve('done');
        						},
				error => {
          					this._notificationService.error(error.statusText, 'Error delete');
            				reject('error');
        				 });
	})
    .then(() => {
    	// Call delete service
    	this._listeattrService.delete(this.listeattr).subscribe(
      			result => {
       						 // Notify Listeattr list to refresh
        					EmitterService.get(this.listId).emit(result);

        					this._notificationService.success(
          					'Deleted',
          					`The listeattr entry with the id='${nomliste}, ${codeelement}, ${nomattribut}' was deleted successfuly`);
     					  },
      			error => {
        					this._notificationService.error(
          					'Error',
          					'An error occured when trying to reach the server');
      					  });
  	})
  }

  goToListeattrForm(nomliste, codeelement, nomattribut) {
    this._router.navigate(['./listeattr-form', nomliste, codeelement, nomattribut]);
  }

  deleteConfirmation = (nomliste, codeelement, nomattribut) => {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `listeattr: ${nomliste}, ${codeelement}, ${nomattribut}`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteListeattr(nomliste, codeelement, nomattribut);
      }
    });
  }

}
