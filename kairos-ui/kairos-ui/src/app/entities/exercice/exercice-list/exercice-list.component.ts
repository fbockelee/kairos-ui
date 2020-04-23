// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-23 ( Time 15:26:34 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router';
import { MatDialog } from '@angular/material';

// Services imports
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { ExerciceService } from './../services/exercice.service';
import { ApplicationStateService } from './../../../services/application-state.service';

// Models imports
import { Exercice } from '../exercice.model';

// Components imports
import { DeleteDialogComponent } from './../../../delete-dialog/delete-dialog.component';

import { DatePipe } from '@angular/common';

// Ajout primeng
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'app-exercice-list',
  templateUrl: './exercice-list.component.html',
  styleUrls: ['./exercice-list.component.css'],
  providers: [DatePipe]
})
export class ExerciceListComponent implements OnInit, OnChanges {

  public title = 'Liste de Exercices';

  public listOfExercices: Exercice[];


  _filter : string;
  @Input('filter') 
  set filter(value:string) {
	 this._filter = value;
     this.getAllExercices();
  }

  get filter():string {
	return this._filter
  }

  @Input() createenable?: boolean = true;
  @Input() deleteenable?: boolean = true;
  @Input() updateenable?: boolean = true;
  @Input() incard?: boolean = true;

  private listId = 'EXERCICE_COMPONENT_LIST';

  private exercice: Exercice;

  private columnDefinitions = [
      { def: 'code', showMobile: true },
      { def: 'ouvert', showMobile: true },
	];

  constructor(
    private _exerciceService: ExerciceService,
    private _router: Router,
    private _notificationService: NotificationService,
    public dialog: MatDialog,
	private _route: ActivatedRoute) { }

  ngOnInit() {
    // On init get all Exercices
    //this.getAllExercices();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Exercice list
    EmitterService.get(this.listId).subscribe((data: Exercice[]) => this.getAllExercices());
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
   * Get all Exercice using the service ExerciceService
   */
  getAllExercices = (): void => {

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

    	this._exerciceService.getAll(options).subscribe(
      		(data: Exercice[]) => {
        		this.listOfExercices = data;
      		},
      	error => {
        	this._notificationService.error(
          	'Error',
          	'An error occured when trying to reach the server');
    	});
	}
  }

  editExercice = (code): void => {
    // Navigate to exercice form component
    this.goToExerciceForm(code);
  }

  deleteExercice = (code): void => {

    const promise = new Promise((resolve, reject) => {
		// Call get service
		this._exerciceService.get(code).subscribe(
        		(exercice: Exercice) => {
          							this.exercice = exercice;
          							resolve('done');
        						},
				error => {
          					this._notificationService.error(error.statusText, 'Error delete');
            				reject('error');
        				 });
	})
    .then(() => {
    	// Call delete service
    	this._exerciceService.delete(this.exercice).subscribe(
      			result => {
       						 // Notify Exercice list to refresh
        					EmitterService.get(this.listId).emit(result);

        					this._notificationService.success(
          					'Deleted',
          					`The exercice entry with the id='${code}' was deleted successfuly`);
     					  },
      			error => {
        					this._notificationService.error(
          					'Error',
          					'An error occured when trying to reach the server');
      					  });
  	})
  }

  goToExerciceForm(code) {
    this._router.navigate(['./exercice-form', code]);
  }

  deleteConfirmation = (code) => {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `exercice: ${code}`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteExercice(code);
      }
    });
  }

}
