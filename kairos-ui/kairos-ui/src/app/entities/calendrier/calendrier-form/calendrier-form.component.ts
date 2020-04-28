// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-27 ( Time 15:44:16 )

// Modules imports
import { NotificationService } from './../../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Components imports
import { DeleteDialogComponent } from './../../../delete-dialog/delete-dialog.component';

import { DatePipe } from '@angular/common';

// Models and services imports
import { Calendrier } from './../calendrier.model';
import { CalendrierService } from './../services/calendrier.service';
import * as _ from 'underscore';

// Pour gestion des listes
import { ListeService } from './../../../entities/liste/services/liste.service';
import { Liste } from './../../../entities/liste/liste.model';

import { Lov } from './../../../common/lov';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-calendrier-form',
  templateUrl: './calendrier-form.component.html',
  styleUrls: ['./calendrier-form.component.css'],
  providers: [DatePipe]
})
export class CalendrierFormComponent extends Lov implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  public title = 'Formulaire Calendrier';
  public form: FormGroup;

  // D�finition des filtres

  public calendrier: Calendrier;
  private ids;

  // D�finition des LOV

  constructor(
	private _listeService: ListeService,         // Pour gestion des listes
    private _calendrierService: CalendrierService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    public dialog: MatDialog) {
		super(_listeService,_notificationService);
 	}

  ngOnInit() {
    this.getIdFromRouteParams();
    this.initForm();
  }

  getIdFromRouteParams = () => {
    this._route.params.subscribe(p => {
        this.ids = _.values(p);
    });
  }

  initForm = () => {
    this.form = this._formBuilder.group(this.getNewForm());
    if (!_.isEmpty(this.ids)) {
      this.load();
    }

	/* Chargement des LOVs */
  }

  getNewForm = (calendrier?: Calendrier) => {
    return {
      datecalendrier: [
          (calendrier ? calendrier.datecalendrier : ''),
          Validators.required
      ],
      codeperiode: [
        (calendrier ? calendrier.codeperiode : '')
      ],
      ferie: [
        (calendrier ? calendrier.ferie : '')
      ]
    };
  }


  load = () => {
	// Concat�ner les ids mais s�par� par / et non ,
	var param : String = '';
	
	for (var i=0;i<this.ids.length;i++) {
		param = param + this.ids[i];
		if (i != (this.ids.length-1)) {
			param = param + '/';
		}
	}
    this._calendrierService.get(param).subscribe(
      (calendrier: Calendrier) => {
        this.calendrier = calendrier;
        this.form = this._formBuilder.group(this.getNewForm(this.calendrier));
      },
      error => {
        if (error.status === this.NOT_FOUND_ERROR) {
          this._notificationService.error(error.statusText, 'Entity not found in database');
        } else if (error.status === this.INTERNAL_SERVER_ERROR) {
          this._notificationService.error(error.statusText, error.json());
        } else {
          this._notificationService.error('Error', 'An error occured when trying to reach the server');
        }
 	  },
      () => {
		// Valorisation des filtres
      });
  }

  save = () => {
	// If we didn't get a calendrier, we are adding a calendrier
    if (!this.calendrier) {
      this.add();
    } else { // If we didn't get a calendrier, we are adding a calendrier
      this.update();
    }
  }

  add = () => {
    this._calendrierService.create(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Calendrier added successfuly');
        this._router.navigate(['./calendrier-form', this.form.value.datecalendrier]);
      },
      error => {1
        if (error.status === this.CONFLICT_ERROR) {
          this._notificationService.error(error.statusText, 'Id already used in database');
        } else if (error.status === this.INTERNAL_SERVER_ERROR) {
          this._notificationService.error(error.statusText, error.json());
        } else {
          this._notificationService.error('Error', 'An error occured when trying to reach the server');
        }
      });
  }

  update = () => {
	Object.assign(this.calendrier,this.form.value);
    this._calendrierService.update(this.calendrier).subscribe(
      result => this._notificationService.success('Success', 'Calendrier edited successfuly'),
      error => {
        if (error.status === this.NOT_FOUND_ERROR) {
          this._notificationService.error(error.statusText, 'Entity not found in database');
        } else if (error.status === this.INTERNAL_SERVER_ERROR) {
          this._notificationService.error(error.statusText, error.json());
        } else {
          this._notificationService.error('Error', 'An error occured when trying to reach the server');
        }
      });
  }

  deleteConfirmation = () => {
    if (this.calendrier.datecalendrier) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: `calendrier: ${this.calendrier.datecalendrier}`
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteBadge(this.calendrier);
        }
      });
    }
  }

  deleteBadge = (calendrier: Calendrier): void => {
    // Call delete service
    this._calendrierService.delete(calendrier).subscribe(
      result => {
        this._router.navigate(['./calendrier-list']);

        this._notificationService.success(
          'Deleted',
         // `The calendrier entry with the id(s)='${datecalendrier}' was deleted successfuly`);
 		`The calendrier entry with the id= was deleted successfuly`);
      },
      error => {
        if (error.status === this.NOT_FOUND_ERROR) {
          this._notificationService.error(error.statusText, 'Entity not found in database');
        } else if (error.status === this.INTERNAL_SERVER_ERROR) {
          this._notificationService.error(error.statusText, error.json());
        } else {
          this._notificationService.error('Error', 'An error occured when trying to reach the server');
        }
      });
  }
}
