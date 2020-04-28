// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-27 ( Time 15:44:26 )

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
import { Exercice } from './../exercice.model';
import { ExerciceService } from './../services/exercice.service';
import * as _ from 'underscore';

// Pour gestion des listes
import { ListeService } from './../../../entities/liste/services/liste.service';
import { Liste } from './../../../entities/liste/liste.model';

import { Lov } from './../../../common/lov';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-exercice-form',
  templateUrl: './exercice-form.component.html',
  styleUrls: ['./exercice-form.component.css'],
  providers: [DatePipe]
})
export class ExerciceFormComponent extends Lov implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  public title = 'Formulaire Exercice';
  public form: FormGroup;

  // D�finition des filtres
  public filter_periode:string;

  public exercice: Exercice;
  private ids;

  // D�finition des LOV

  constructor(
	private _listeService: ListeService,         // Pour gestion des listes
    private _exerciceService: ExerciceService,
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

  getNewForm = (exercice?: Exercice) => {
    return {
      code: [
          (exercice ? exercice.code : ''),
          Validators.required
      ],
      ouvert: [
        (exercice ? exercice.ouvert : '')
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
    this._exerciceService.get(param).subscribe(
      (exercice: Exercice) => {
        this.exercice = exercice;
        this.form = this._formBuilder.group(this.getNewForm(this.exercice));
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
		this.filter_periode = JSON.stringify([{key: 'codeexercice', value: this.exercice.code},]);
      });
  }

  save = () => {
	// If we didn't get a exercice, we are adding a exercice
    if (!this.exercice) {
      this.add();
    } else { // If we didn't get a exercice, we are adding a exercice
      this.update();
    }
  }

  add = () => {
    this._exerciceService.create(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Exercice added successfuly');
        this._router.navigate(['./exercice-form', this.form.value.code]);
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
	Object.assign(this.exercice,this.form.value);
    this._exerciceService.update(this.exercice).subscribe(
      result => this._notificationService.success('Success', 'Exercice edited successfuly'),
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
    if (this.exercice.code) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: `exercice: ${this.exercice.code}`
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteBadge(this.exercice);
        }
      });
    }
  }

  deleteBadge = (exercice: Exercice): void => {
    // Call delete service
    this._exerciceService.delete(exercice).subscribe(
      result => {
        this._router.navigate(['./exercice-list']);

        this._notificationService.success(
          'Deleted',
         // `The exercice entry with the id(s)='${code}' was deleted successfuly`);
 		`The exercice entry with the id= was deleted successfuly`);
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
