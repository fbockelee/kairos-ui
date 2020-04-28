// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 12:07:40 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router';
import { MatDialog } from '@angular/material';

// Services imports
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { PostebudgetaireService } from './../services/postebudgetaire.service';
import { ApplicationStateService } from './../../../services/application-state.service';

// Models imports
import { Postebudgetaire } from '../postebudgetaire.model';

// Components imports
import { DeleteDialogComponent } from './../../../delete-dialog/delete-dialog.component';

import { DatePipe } from '@angular/common';

// Ajout primeng
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'app-postebudgetaire-list',
  templateUrl: './postebudgetaire-list.component.html',
  styleUrls: ['./postebudgetaire-list.component.css'],
  providers: [DatePipe]
})
export class PostebudgetaireListComponent implements OnInit, OnChanges {

  public title = 'Liste de Postebudgetaires';

  public listOfPostebudgetaires: Postebudgetaire[];


  _filter : string;
  @Input('filter') 
  set filter(value:string) {
	 this._filter = value;
     this.getAllPostebudgetaires();
  }

  get filter():string {
	return this._filter
  }

  @Input() createenable?: boolean = true;
  @Input() deleteenable?: boolean = true;
  @Input() updateenable?: boolean = true;
  @Input() incard?: boolean = true;

  private listId = 'POSTEBUDGETAIRE_COMPONENT_LIST';

  private postebudgetaire: Postebudgetaire;

  private columnDefinitions = [
      { def: 'code', showMobile: true, display:'table-cell', index:0},
      { def: 'nom', showMobile: true, display:'table-cell', index:1},
      { def: 'ordre', showMobile: true, display:'table-cell', index:2},
      { def: 'analytique', showMobile: true, display:'table-cell', index:3},
      { def: 'image', showMobile: true, display:'table-cell', index:4},
	];

  constructor(
    private _postebudgetaireService: PostebudgetaireService,
    private _router: Router,
    private _notificationService: NotificationService,
    public dialog: MatDialog,
	private _route: ActivatedRoute) { }

  ngOnInit() {
    // On init get all Postebudgetaires
    //this.getAllPostebudgetaires();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Postebudgetaire list
    EmitterService.get(this.listId).subscribe((data: Postebudgetaire[]) => this.getAllPostebudgetaires());
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
   * Get all Postebudgetaire using the service PostebudgetaireService
   */
  getAllPostebudgetaires = (): void => {

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

    	this._postebudgetaireService.getAll(options).subscribe(
      		(data: Postebudgetaire[]) => {
        		this.listOfPostebudgetaires = data;
      		},
      	error => {
        	this._notificationService.error(
          	'Error',
          	'An error occured when trying to reach the server');
    	});
	}
  }

  editPostebudgetaire = (code): void => {
    // Navigate to postebudgetaire form component
    this.goToPostebudgetaireForm(code);
  }

  deletePostebudgetaire = (code): void => {

    const promise = new Promise((resolve, reject) => {
		// Call get service
		this._postebudgetaireService.get([code]).subscribe(
        		(postebudgetaire: Postebudgetaire) => {
          							this.postebudgetaire = postebudgetaire;
          							resolve('done');
        						},
				error => {
          					this._notificationService.error(error.statusText, 'Error delete');
            				reject('error');
        				 });
	})
    .then(() => {
    	// Call delete service
    	this._postebudgetaireService.delete(this.postebudgetaire).subscribe(
      			result => {
       						 // Notify Postebudgetaire list to refresh
        					EmitterService.get(this.listId).emit(result);

        					this._notificationService.success(
          					'Deleted',
          					`The postebudgetaire entry with the id='${code}' was deleted successfuly`);
     					  },
      			error => {
        					this._notificationService.error(
          					'Error',
          					'An error occured when trying to reach the server');
      					  });
  	})
  }

  goToPostebudgetaireForm(code) {
    this._router.navigate(['./postebudgetaire-form', code]);
  }

  deleteConfirmation = (code) => {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `postebudgetaire: ${code}`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePostebudgetaire(code);
      }
    });
  }

}
