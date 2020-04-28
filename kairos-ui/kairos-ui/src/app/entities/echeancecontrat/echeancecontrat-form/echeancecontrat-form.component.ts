// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-27 ( Time 15:44:24 )

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
import { Echeancecontrat } from './../echeancecontrat.model';
import { EcheancecontratService } from './../services/echeancecontrat.service';
import * as _ from 'underscore';

// Pour gestion des listes
import { ListeService } from './../../../entities/liste/services/liste.service';
import { Liste } from './../../../entities/liste/liste.model';

import { Lov } from './../../../common/lov';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-echeancecontrat-form',
  templateUrl: './echeancecontrat-form.component.html',
  styleUrls: ['./echeancecontrat-form.component.css'],
  providers: [DatePipe]
})
export class EcheancecontratFormComponent extends Lov implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  public title = 'Formulaire Echeancecontrat';
  public form: FormGroup;

  // D�finition des filtres

  public echeancecontrat: Echeancecontrat;
  private ids;

  // D�finition des LOV

  constructor(
	private _listeService: ListeService,         // Pour gestion des listes
    private _echeancecontratService: EcheancecontratService,
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

  getNewForm = (echeancecontrat?: Echeancecontrat) => {
    return {
      echeancecontratid: [{
          value: (echeancecontrat ? echeancecontrat.echeancecontratid : ''),
          disabled: true
      }],      idcontrat: [
        (echeancecontrat ? echeancecontrat.idcontrat : ''),
        Validators.required
      ],
      dateecheance: [
        (echeancecontrat ? echeancecontrat.dateecheance : null)
      ],
      libelle: [
        (echeancecontrat ? echeancecontrat.libelle : '')
      ],
      montantht: [
        (echeancecontrat ? echeancecontrat.montantht : '')
      ],
      tauxtva: [
        (echeancecontrat ? echeancecontrat.tauxtva : '')
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
    this._echeancecontratService.get(param).subscribe(
      (echeancecontrat: Echeancecontrat) => {
        this.echeancecontrat = echeancecontrat;
        this.form = this._formBuilder.group(this.getNewForm(this.echeancecontrat));
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
	// If we didn't get a echeancecontrat, we are adding a echeancecontrat
    if (!this.echeancecontrat) {
      this.add();
    } else { // If we didn't get a echeancecontrat, we are adding a echeancecontrat
      this.update();
    }
  }

  add = () => {
    this._echeancecontratService.create(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Echeancecontrat added successfuly');
        this._router.navigate(['./echeancecontrat-form', this.form.value.echeancecontratid]);
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
	Object.assign(this.echeancecontrat,this.form.value);
    this._echeancecontratService.update(this.echeancecontrat).subscribe(
      result => this._notificationService.success('Success', 'Echeancecontrat edited successfuly'),
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
    if (this.echeancecontrat.echeancecontratid) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: `echeancecontrat: ${this.echeancecontrat.echeancecontratid}`
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteBadge(this.echeancecontrat);
        }
      });
    }
  }

  deleteBadge = (echeancecontrat: Echeancecontrat): void => {
    // Call delete service
    this._echeancecontratService.delete(echeancecontrat).subscribe(
      result => {
        this._router.navigate(['./echeancecontrat-list']);

        this._notificationService.success(
          'Deleted',
         // `The echeancecontrat entry with the id(s)='${echeancecontratid}' was deleted successfuly`);
 		`The echeancecontrat entry with the id= was deleted successfuly`);
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
