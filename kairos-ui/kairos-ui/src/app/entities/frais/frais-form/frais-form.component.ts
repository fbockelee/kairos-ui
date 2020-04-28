// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 12:07:31 )

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
import { Frais } from './../frais.model';
import { FraisService } from './../services/frais.service';
import * as _ from 'underscore';

// Pour gestion des listes
import { ListeService } from './../../../entities/liste/services/liste.service';
import { Liste } from './../../../entities/liste/liste.model';

import { Lov } from './../../../common/lov';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-frais-form',
  templateUrl: './frais-form.component.html',
  styleUrls: ['./frais-form.component.css'],
  providers: [DatePipe]
})
export class FraisFormComponent extends Lov implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  public title = 'Formulaire Frais';
  public form: FormGroup;

  // D�finition des filtres

  public frais: Frais;
  private ids;

  // D�finition des LOV

  constructor(
	private _listeService: ListeService,         // Pour gestion des listes
    private _fraisService: FraisService,
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

  getNewForm = (frais?: Frais) => {
    return {
      fraisid: [{
          value: (frais ? frais.fraisid : ''),
          disabled: true
      }],      idconsultant: [
        (frais ? frais.idconsultant : ''),
        Validators.required
      ],
      codeperiode: [
        (frais ? frais.codeperiode : '')
      ],
      commentaire: [
        (frais ? frais.commentaire : '')
      ],
      statut: [
        (frais ? frais.statut : '')
      ],
      datevalidation: [
        (frais ? frais.datevalidation : null)
      ],
      datepaiement: [
        (frais ? frais.datepaiement : null)
      ],
      paiement: [
        (frais ? frais.paiement : '')
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
    this._fraisService.get(param).subscribe(
      (frais: Frais) => {
        this.frais = frais;
        this.form = this._formBuilder.group(this.getNewForm(this.frais));
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
	// If we didn't get a frais, we are adding a frais
    if (!this.frais) {
      this.add();
    } else { // If we didn't get a frais, we are adding a frais
      this.update();
    }
  }

  add = () => {
    this._fraisService.create(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Frais added successfuly');
        this._router.navigate(['./frais-form', this.form.value.fraisid]);
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
	Object.assign(this.frais,this.form.value);
    this._fraisService.update(this.frais).subscribe(
      result => this._notificationService.success('Success', 'Frais edited successfuly'),
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
    if (this.frais.fraisid) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: `frais: ${this.frais.fraisid}`
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteBadge(this.frais);
        }
      });
    }
  }

  deleteBadge = (frais: Frais): void => {
    // Call delete service
    this._fraisService.delete(frais).subscribe(
      result => {
        this._router.navigate(['./frais-list']);

        this._notificationService.success(
          'Deleted',
         // `The frais entry with the id(s)='${fraisid}' was deleted successfuly`);
 		`The frais entry with the id= was deleted successfuly`);
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
