// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-03-26 ( Time 10:16:43 )

// Modules imports
import { NotificationService } from './../../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Components imports
import { DeleteDialogComponent } from './../../../delete-dialog/delete-dialog.component';

import { DatePipe } from '@angular/common';

// Models and services imports
import { Liste } from './../liste.model';
import { ListeService } from './../services/liste.service';
import * as _ from 'underscore';

import { Lov } from './../../../common/lov';
@Component({
  selector: 'app-liste-form',
  templateUrl: './liste-form.component.html',
  styleUrls: ['./liste-form.component.css'],
  providers: [DatePipe]
})
export class ListeFormComponent extends Lov implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  public title = 'Formulaire Liste';
  public form: FormGroup;

  public liste: Liste;
  private ids;

  // D�finition des LOV

  constructor(
	private _listeService: ListeService,         // Pour gestion des listes 
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

  getNewForm = (liste?: Liste) => {
    return {
      nomliste: [
          (liste ? liste.nomliste : ''),
          Validators.required
      ],
      codeelement: [
          (liste ? liste.codeelement : ''),
          Validators.required
      ],
      nomelement: [
        (liste ? liste.nomelement : '')
      ],
      ordretri: [
        (liste ? liste.ordretri : '')
      ],
      image: [
        (liste ? liste.image : '')
      ],
      defaut: [
        (liste ? liste.defaut : '')
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
    this._listeService.get(param).subscribe(
      (liste: Liste) => {
        this.liste = liste;
        this.form = this._formBuilder.group(this.getNewForm(this.liste));
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

  save = () => {
	// If we didn't get a liste, we are adding a liste
    if (!this.liste) {
      this.add();
    } else { // If we didn't get a liste, we are adding a liste
      this.update();
    }
  }

  add = () => {
    this._listeService.create(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Liste added successfuly');
        this._router.navigate(['./liste-form', this.form.value.nomliste, this.form.value.codeelement]);
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
	Object.assign(this.liste,this.form.value);
    this._listeService.update(this.liste).subscribe(
      result => this._notificationService.success('Success', 'Liste edited successfuly'),
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
    if (this.liste.nomliste && this.liste.codeelement) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: `liste: ${this.liste.nomliste}, ${this.liste.codeelement}`
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteBadge(this.liste);
        }
      });
    }
  }

  deleteBadge = (liste: Liste): void => {
    // Call delete service
    this._listeService.delete(liste).subscribe(
      result => {
        this._router.navigate(['./liste-list']);

        this._notificationService.success(
          'Deleted',
         // `The liste entry with the id(s)='${nomliste}, ${codeelement}' was deleted successfuly`);
 		`The liste entry with the id= was deleted successfuly`);
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
