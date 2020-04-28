// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 12:07:18 )

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
import { Baremekm } from './../baremekm.model';
import { BaremekmService } from './../services/baremekm.service';
import * as _ from 'underscore';

// Pour gestion des listes
import { ListeService } from './../../../entities/liste/services/liste.service';
import { Liste } from './../../../entities/liste/liste.model';

import { Lov } from './../../../common/lov';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-baremekm-form',
  templateUrl: './baremekm-form.component.html',
  styleUrls: ['./baremekm-form.component.css'],
  providers: [DatePipe]
})
export class BaremekmFormComponent extends Lov implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  public title = 'Formulaire Baremekm';
  public form: FormGroup;

  // D�finition des filtres

  public baremekm: Baremekm;
  private ids;

  // D�finition des LOV

  constructor(
	private _listeService: ListeService,         // Pour gestion des listes
    private _baremekmService: BaremekmService,
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

  getNewForm = (baremekm?: Baremekm) => {
    return {
      annee: [
          (baremekm ? baremekm.annee : ''),
          Validators.required
      ],
      cv: [
          (baremekm ? baremekm.cv : ''),
          Validators.required
      ],
      baremefisc1: [
        (baremekm ? baremekm.baremefisc1 : '')
      ],
      baremefisc2: [
        (baremekm ? baremekm.baremefisc2 : '')
      ],
      baremefisc3: [
        (baremekm ? baremekm.baremefisc3 : '')
      ],
      bareme: [
        (baremekm ? baremekm.bareme : '')
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
    this._baremekmService.get(param).subscribe(
      (baremekm: Baremekm) => {
        this.baremekm = baremekm;
        this.form = this._formBuilder.group(this.getNewForm(this.baremekm));
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
	// If we didn't get a baremekm, we are adding a baremekm
    if (!this.baremekm) {
      this.add();
    } else { // If we didn't get a baremekm, we are adding a baremekm
      this.update();
    }
  }

  add = () => {
    this._baremekmService.create(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Baremekm added successfuly');
        this._router.navigate(['./baremekm-form', this.form.value.annee, this.form.value.cv]);
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
	Object.assign(this.baremekm,this.form.value);
    this._baremekmService.update(this.baremekm).subscribe(
      result => this._notificationService.success('Success', 'Baremekm edited successfuly'),
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
    if (this.baremekm.annee && this.baremekm.cv) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: `baremekm: ${this.baremekm.annee}, ${this.baremekm.cv}`
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteBadge(this.baremekm);
        }
      });
    }
  }

  deleteBadge = (baremekm: Baremekm): void => {
    // Call delete service
    this._baremekmService.delete(baremekm).subscribe(
      result => {
        this._router.navigate(['./baremekm-list']);

        this._notificationService.success(
          'Deleted',
         // `The baremekm entry with the id(s)='${annee}, ${cv}' was deleted successfuly`);
 		`The baremekm entry with the id= was deleted successfuly`);
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
