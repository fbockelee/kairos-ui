// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 12:07:17 )

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
import { Alerte } from './../alerte.model';
import { AlerteService } from './../services/alerte.service';
import * as _ from 'underscore';

// Pour gestion des listes
import { ListeService } from './../../../entities/liste/services/liste.service';
import { Liste } from './../../../entities/liste/liste.model';

import { Lov } from './../../../common/lov';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-alerte-form',
  templateUrl: './alerte-form.component.html',
  styleUrls: ['./alerte-form.component.css'],
  providers: [DatePipe]
})
export class AlerteFormComponent extends Lov implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  public title = 'Formulaire Alerte';
  public form: FormGroup;

  // D�finition des filtres

  public alerte: Alerte;
  private ids;

  // D�finition des LOV

  constructor(
	private _listeService: ListeService,         // Pour gestion des listes
    private _alerteService: AlerteService,
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

  getNewForm = (alerte?: Alerte) => {
    return {
      code: [
          (alerte ? alerte.code : ''),
          Validators.required
      ],
      description: [
        (alerte ? alerte.description : '')
      ],
      email: [
        (alerte ? alerte.email : '')
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
    this._alerteService.get(param).subscribe(
      (alerte: Alerte) => {
        this.alerte = alerte;
        this.form = this._formBuilder.group(this.getNewForm(this.alerte));
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
	// If we didn't get a alerte, we are adding a alerte
    if (!this.alerte) {
      this.add();
    } else { // If we didn't get a alerte, we are adding a alerte
      this.update();
    }
  }

  add = () => {
    this._alerteService.create(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Alerte added successfuly');
        this._router.navigate(['./alerte-form', this.form.value.code]);
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
	Object.assign(this.alerte,this.form.value);
    this._alerteService.update(this.alerte).subscribe(
      result => this._notificationService.success('Success', 'Alerte edited successfuly'),
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
    if (this.alerte.code) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: `alerte: ${this.alerte.code}`
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteBadge(this.alerte);
        }
      });
    }
  }

  deleteBadge = (alerte: Alerte): void => {
    // Call delete service
    this._alerteService.delete(alerte).subscribe(
      result => {
        this._router.navigate(['./alerte-list']);

        this._notificationService.success(
          'Deleted',
         // `The alerte entry with the id(s)='${code}' was deleted successfuly`);
 		`The alerte entry with the id= was deleted successfuly`);
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
