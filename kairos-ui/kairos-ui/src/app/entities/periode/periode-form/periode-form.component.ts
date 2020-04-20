// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-14 ( Time 19:52:59 )

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
import { Periode } from './../periode.model';
import { PeriodeService } from './../services/periode.service';
import * as _ from 'underscore';

// Pour gestion des listes
import { ListeService } from './../../../entities/liste/services/liste.service';
import { Liste } from './../../../entities/liste/liste.model';

import { Lov } from './../../../common/lov';
import {SelectItem} from 'primeng/api';

import {CalendrierListComponent} from './../../../entities/calendrier/calendrier-list/calendrier-list.component';

@Component({
  selector: 'app-periode-form',
  templateUrl: './periode-form.component.html',
  styleUrls: ['./periode-form.component.css'],
  providers: [DatePipe]
})
export class PeriodeFormComponent extends Lov implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  public title = 'Formulaire Periode';
  public form: FormGroup;
  public filter:string;

  public periode: Periode;
  private ids;

  // D�finition des LOV

  constructor(
	private _listeService: ListeService,         // Pour gestion des listes
    private _periodeService: PeriodeService,
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
	//this.filter="init";
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

  getNewForm = (periode?: Periode) => {
    return {
      code: [
          (periode ? periode.code : ''),
          Validators.required
      ],
      nom: [
        (periode ? periode.nom : '')
      ],
      codeexercice: [
        (periode ? periode.codeexercice : '')
      ],
      ouvert: [
        (periode ? periode.ouvert : '')
      ],
      actif: [
        (periode ? periode.actif : '')
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
    this._periodeService.get(param).subscribe(
      (periode: Periode) => {
        this.periode = periode;
        this.form = this._formBuilder.group(this.getNewForm(this.periode));
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
		this.filter = JSON.stringify([{key: 'codeperiode', value: this.periode.code},]);
		
		// "codelement=" + this.periode.code; 
		console.log('1: ' + this.filter);
      });
		console.log('2: ' + this.filter);
  }

  save = () => {
	// If we didn't get a periode, we are adding a periode
    if (!this.periode) {
      this.add();
    } else { // If we didn't get a periode, we are adding a periode
      this.update();
    }
  }

  add = () => {
    this._periodeService.create(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Periode added successfuly');
        this._router.navigate(['./periode-form', this.form.value.code]);
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
	Object.assign(this.periode,this.form.value);
    this._periodeService.update(this.periode).subscribe(
      result => this._notificationService.success('Success', 'Periode edited successfuly'),
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
    if (this.periode.code) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: `periode: ${this.periode.code}`
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteBadge(this.periode);
        }
      });
    }
  }

  deleteBadge = (periode: Periode): void => {
    // Call delete service
    this._periodeService.delete(periode).subscribe(
      result => {
        this._router.navigate(['./periode-list']);

        this._notificationService.success(
          'Deleted',
         // `The periode entry with the id(s)='${code}' was deleted successfuly`);
 		`The periode entry with the id= was deleted successfuly`);
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
