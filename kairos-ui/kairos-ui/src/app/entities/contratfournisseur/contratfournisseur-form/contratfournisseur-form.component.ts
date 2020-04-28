// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 15:10:41 )

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
import { Contratfournisseur } from './../contratfournisseur.model';
import { ContratfournisseurService } from './../services/contratfournisseur.service';
import * as _ from 'underscore';

// Pour gestion des listes
import { ListeService } from './../../../entities/liste/services/liste.service';
import { Liste } from './../../../entities/liste/liste.model';

import { Lov } from './../../../common/lov';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-contratfournisseur-form',
  templateUrl: './contratfournisseur-form.component.html',
  styleUrls: ['./contratfournisseur-form.component.css'],
  providers: [DatePipe]
})
export class ContratfournisseurFormComponent extends Lov implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  public title = 'Formulaire Contratfournisseur';
  public form: FormGroup;

  // D�finition des filtres
  public filter_echeancecontratfournisseur:string;

  public contratfournisseur: Contratfournisseur;
  private ids;

  // D�finition des LOV
  public listOfCATEGORIE_CONTRAT_itm: SelectItem[];

  constructor(
	private _listeService: ListeService,         // Pour gestion des listes
    private _contratfournisseurService: ContratfournisseurService,
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
	this.getLOV ('CATEGORIE_CONTRAT').then(data_itm => {
		this.listOfCATEGORIE_CONTRAT_itm = data_itm; 
	});
  }

  getNewForm = (contratfournisseur?: Contratfournisseur) => {
    return {
      contratfournisseurid: [{
          value: (contratfournisseur ? contratfournisseur.contratfournisseurid : ''),
          disabled: true
      }],      reference: [
        (contratfournisseur ? contratfournisseur.reference : '')
      ],
      idfournisseur: [
        (contratfournisseur ? contratfournisseur.idfournisseur : ''),
        Validators.required
      ],
      contact1: [
        (contratfournisseur ? contratfournisseur.contact1 : '')
      ],
      tel1Portable: [
        (contratfournisseur ? contratfournisseur.tel1Portable : '')
      ],
      tel1Travail: [
        (contratfournisseur ? contratfournisseur.tel1Travail : '')
      ],
      tel1Domicile: [
        (contratfournisseur ? contratfournisseur.tel1Domicile : '')
      ],
      datedebut: [
        (contratfournisseur ? contratfournisseur.datedebut : null)
      ],
      datefin: [
        (contratfournisseur ? contratfournisseur.datefin : null)
      ],
      referencefournisseur: [
        (contratfournisseur ? contratfournisseur.referencefournisseur : '')
      ],
      avenant: [
        (contratfournisseur ? contratfournisseur.avenant : ''),
        Validators.required
      ],
      mail1: [
        (contratfournisseur ? contratfournisseur.mail1 : '')
      ],
      adressefact: [
        (contratfournisseur ? contratfournisseur.adressefact : '')
      ],
      contactfact: [
        (contratfournisseur ? contratfournisseur.contactfact : '')
      ],
      categorie: [
        (contratfournisseur ? contratfournisseur.categorie : ''),
        Validators.required
      ],
      factcra: [
        (contratfournisseur ? contratfournisseur.factcra : '')
      ],
      dateenvoi: [
        (contratfournisseur ? contratfournisseur.dateenvoi : null)
      ],
      dateretour: [
        (contratfournisseur ? contratfournisseur.dateretour : null)
      ],
      arcurssaf: [
        (contratfournisseur ? contratfournisseur.arcurssaf : '')
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
    this._contratfournisseurService.get(param).subscribe(
      (contratfournisseur: Contratfournisseur) => {
        this.contratfournisseur = contratfournisseur;
        this.form = this._formBuilder.group(this.getNewForm(this.contratfournisseur));
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
		this.filter_echeancecontratfournisseur = JSON.stringify([{key: 'idcontrat', value: this.contratfournisseur.contratfournisseurid},]);
      });
  }

  save = () => {
	// If we didn't get a contratfournisseur, we are adding a contratfournisseur
    if (!this.contratfournisseur) {
      this.add();
    } else { // If we didn't get a contratfournisseur, we are adding a contratfournisseur
      this.update();
    }
  }

  add = () => {
    this._contratfournisseurService.create(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Contratfournisseur added successfuly');
        this._router.navigate(['./contratfournisseur-form', this.form.value.contratfournisseurid]);
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
	Object.assign(this.contratfournisseur,this.form.value);
    this._contratfournisseurService.update(this.contratfournisseur).subscribe(
      result => this._notificationService.success('Success', 'Contratfournisseur edited successfuly'),
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
    if (this.contratfournisseur.contratfournisseurid) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: `contratfournisseur: ${this.contratfournisseur.contratfournisseurid}`
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteBadge(this.contratfournisseur);
        }
      });
    }
  }

  deleteBadge = (contratfournisseur: Contratfournisseur): void => {
    // Call delete service
    this._contratfournisseurService.delete(contratfournisseur).subscribe(
      result => {
        this._router.navigate(['./contratfournisseur-list']);

        this._notificationService.success(
          'Deleted',
         // `The contratfournisseur entry with the id(s)='${contratfournisseurid}' was deleted successfuly`);
 		`The contratfournisseur entry with the id= was deleted successfuly`);
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
