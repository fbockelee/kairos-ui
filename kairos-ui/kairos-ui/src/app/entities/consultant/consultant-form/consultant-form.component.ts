// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-03-20 ( Time 13:45:25 )

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
import { Consultant } from './../consultant.model';
import { ConsultantService } from './../services/consultant.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-consultant-form',
  templateUrl: './consultant-form.component.html',
  styleUrls: ['./consultant-form.component.css'],
  providers: [DatePipe]
})
export class ConsultantFormComponent implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  public title = 'Formulaire Consultant';
  public form: FormGroup;

  public consultant: Consultant;
  private ids;

  constructor(
    private _consultantService: ConsultantService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    public dialog: MatDialog) { }

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
  }

  getNewForm = (consultant?: Consultant) => {
    return {
      consultantid: [{
          value: (consultant ? consultant.consultantid : ''),
          disabled: true
      }],      nom: [
        (consultant ? consultant.nom : '')
      ],
      prenom: [
        (consultant ? consultant.prenom : '')
      ],
      trigramme: [
        (consultant ? consultant.trigramme : '')
      ],
      userLogin: [
        (consultant ? consultant.userLogin : '')
      ],
      userPassword: [
        (consultant ? consultant.userPassword : '')
      ],
      adresse1: [
        (consultant ? consultant.adresse1 : '')
      ],
      adresse2: [
        (consultant ? consultant.adresse2 : '')
      ],
      telPortable: [
        (consultant ? consultant.telPortable : '')
      ],
      telTravail: [
        (consultant ? consultant.telTravail : '')
      ],
      telDomicile: [
        (consultant ? consultant.telDomicile : '')
      ],
      codeprofil: [
        (consultant ? consultant.codeprofil : '')
      ],
      datefin: [
        (consultant ? consultant.datefin : null)
      ],
      email: [
        (consultant ? consultant.email : '')
      ],
      datedebut: [
        (consultant ? consultant.datedebut : null)
      ],
      codepostal: [
        (consultant ? consultant.codepostal : '')
      ],
      ville: [
        (consultant ? consultant.ville : '')
      ],
      lieunaissance: [
        (consultant ? consultant.lieunaissance : '')
      ],
      datenaissance: [
        (consultant ? consultant.datenaissance : null)
      ],
      telimei: [
        (consultant ? consultant.telimei : '')
      ],
      telcontrat: [
        (consultant ? consultant.telcontrat : '')
      ],
      telecheance: [
        (consultant ? consultant.telecheance : null)
      ],
      vehpersimmat: [
        (consultant ? consultant.vehpersimmat : '')
      ],
      vehproimmat: [
        (consultant ? consultant.vehproimmat : '')
      ],
      vehproass: [
        (consultant ? consultant.vehproass : '')
      ],
      vehperscv: [
        (consultant ? consultant.vehperscv : '')
      ],
      vehprocv: [
        (consultant ? consultant.vehprocv : '')
      ],
      vehpermis: [
        (consultant ? consultant.vehpermis : '')
      ],
      vehpersmodele: [
        (consultant ? consultant.vehpersmodele : '')
      ],
      vehpromodele: [
        (consultant ? consultant.vehpromodele : '')
      ],
      vehprorevision: [
        (consultant ? consultant.vehprorevision : '')
      ],
      vehprotauxspec: [
        (consultant ? consultant.vehprotauxspec : '')
      ],
      ordmodele: [
        (consultant ? consultant.ordmodele : '')
      ],
      orddate: [
        (consultant ? consultant.orddate : null)
      ],
      ordmontantht: [
        (consultant ? consultant.ordmontantht : '')
      ],
      ordinfo: [
        (consultant ? consultant.ordinfo : '')
      ],
      adslplaf: [
        (consultant ? consultant.adslplaf : '')
      ],
      telpersplaf: [
        (consultant ? consultant.telpersplaf : '')
      ],
      trspkmsiege: [
        (consultant ? consultant.trspkmsiege : '')
      ],
      trspnbkmsiege: [
        (consultant ? consultant.trspnbkmsiege : '')
      ],
      trspcarte: [
        (consultant ? consultant.trspcarte : '')
      ],
      societe: [
        (consultant ? consultant.societe : '')
      ],
      comptendf: [
        (consultant ? consultant.comptendf : '')
      ]
    };
  }


  load = () => {
    this._consultantService.get(this.ids).subscribe(
      (consultant: Consultant) => {
        this.consultant = consultant;
        this.form = this._formBuilder.group(this.getNewForm(this.consultant));
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
	// If we didn't get a consultant, we are adding a consultant
    if (!this.consultant) {
      this.add();
    } else { // If we didn't get a consultant, we are adding a consultant
      this.update();
    }
  }

  add = () => {
    this._consultantService.create(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Consultant added successfuly');
        this._router.navigate(['./consultant-form', this.form.value.consultantid]);
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
	Object.assign(this.consultant,this.form.value);
    this._consultantService.update(this.consultant).subscribe(
      result => this._notificationService.success('Success', 'Consultant edited successfuly'),
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
    if (this.consultant.consultantid) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: `consultant: ${this.consultant.consultantid}`
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteBadge(this.consultant);
        }
      });
    }
  }

  deleteBadge = (consultant: Consultant): void => {
    // Call delete service
    this._consultantService.delete(consultant).subscribe(
      result => {
        this._router.navigate(['./consultant-list']);

        this._notificationService.success(
          'Deleted',
         // `The consultant entry with the id(s)='${consultantid}' was deleted successfuly`);
 		`The consultant entry with the id= was deleted successfuly`);
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
