// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 16:11:25 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router';
import { MatDialog } from '@angular/material';

// Services imports
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { ClientService } from './../services/client.service';
import { ApplicationStateService } from './../../../services/application-state.service';

// Models imports
import { Client } from '../client.model';

// Components imports
import { DeleteDialogComponent } from './../../../delete-dialog/delete-dialog.component';

import { DatePipe } from '@angular/common';

// Ajout primeng
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers: [DatePipe]
})
export class ClientListComponent implements OnInit, OnChanges {

  public title = 'Liste de Clients';

  public listOfClients: Client[];


  _filter : string;
  @Input('filter') 
  set filter(value:string) {
	 this._filter = value;
     this.getAllClients();
  }

  get filter():string {
	return this._filter
  }

  @Input() createenable?: boolean = true;
  @Input() deleteenable?: boolean = true;
  @Input() updateenable?: boolean = true;
  @Input() incard?: boolean = true;

  private listId = 'CLIENT_COMPONENT_LIST';

  private client: Client;

  private columnDefinitions = [
      { def: 'adresse1', showMobile: true, display:'none', index:0},
      { def: 'adresse2', showMobile: true, display:'none', index:1},
      { def: 'tel1_travail', showMobile: true, display:'none', index:2},
      { def: 'tel1_domicile', showMobile: true, display:'none', index:3},
      { def: 'contact2', showMobile: true, display:'none', index:4},
      { def: 'tel2_portable', showMobile: true, display:'none', index:5},
      { def: 'tel2_travail', showMobile: true, display:'none', index:6},
      { def: 'tel2_domicile', showMobile: true, display:'none', index:7},
      { def: 'trigramme', showMobile: true, display:'none', index:8},
      { def: 'contrat', showMobile: true, display:'none', index:9},
      { def: 'clientid', showMobile: true, display:'table-cell', index:10},
      { def: 'raisonsociale', showMobile: true, display:'table-cell', index:11},
      { def: 'contact1', showMobile: true, display:'table-cell', index:12},
      { def: 'tel1_portable', showMobile: true, display:'table-cell', index:13},
	];

  constructor(
    private _clientService: ClientService,
    private _router: Router,
    private _notificationService: NotificationService,
    public dialog: MatDialog,
	private _route: ActivatedRoute) { }

  ngOnInit() {
    // On init get all Clients
    //this.getAllClients();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Client list
    EmitterService.get(this.listId).subscribe((data: Client[]) => this.getAllClients());
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
   * Get all Client using the service ClientService
   */
  getAllClients = (): void => {

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

    	this._clientService.getAll(options).subscribe(
      		(data: Client[]) => {
        		this.listOfClients = data;
      		},
      	error => {
        	this._notificationService.error(
          	'Error',
          	'An error occured when trying to reach the server');
    	});
	}
  }

  editClient = (clientid): void => {
    // Navigate to client form component
    this.goToClientForm(clientid);
  }

  deleteClient = (clientid): void => {

    const promise = new Promise((resolve, reject) => {
		// Call get service
		this._clientService.get([clientid]).subscribe(
        		(client: Client) => {
          							this.client = client;
          							resolve('done');
        						},
				error => {
          					this._notificationService.error(error.statusText, 'Error delete');
            				reject('error');
        				 });
	})
    .then(() => {
    	// Call delete service
    	this._clientService.delete(this.client).subscribe(
      			result => {
       						 // Notify Client list to refresh
        					EmitterService.get(this.listId).emit(result);

        					this._notificationService.success(
          					'Deleted',
          					`The client entry with the id='${clientid}' was deleted successfuly`);
     					  },
      			error => {
        					this._notificationService.error(
          					'Error',
          					'An error occured when trying to reach the server');
      					  });
  	})
  }

  goToClientForm(clientid) {
    this._router.navigate(['./client-form', clientid]);
  }

  deleteConfirmation = (clientid) => {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `client: ${clientid}`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteClient(clientid);
      }
    });
  }

}
