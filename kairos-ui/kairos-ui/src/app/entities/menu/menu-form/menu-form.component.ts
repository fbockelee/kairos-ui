// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-02-07 ( Time 16:54:38 )

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
import { Menu } from './../menu.model';
import { MenuService } from './../services/menu.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css'],
  providers: [DatePipe]
})
export class MenuFormComponent implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  public title = 'Formulaire Menu';
  public form: FormGroup;

  private menu: Menu;
  private ids;

  constructor(
    private _menuService: MenuService,
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

  getNewForm = (menu?: Menu) => {
    return {
      codemenu: [
          (menu ? menu.codemenu : ''),
          Validators.required
      ],
      url: [
        (menu ? menu.url : '')
      ],
      image: [
        (menu ? menu.image : '')
      ],
      nom: [
        (menu ? menu.nom : '')
      ],
      profils: [
        (menu ? menu.profils : '')
      ]
    };
  }


  load = () => {
    this._menuService.get(this.ids).subscribe(
      (menu: Menu) => {
        this.menu = menu;
        this.form = this._formBuilder.group(this.getNewForm(this.menu));
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
	// If we didn't get a menu, we are adding a menu
    if (!this.menu) {
      this.add();
    } else { // If we didn't get a menu, we are adding a menu
      this.update();
    }
  }

  add = () => {
    this._menuService.create(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Menu added successfuly');
        this._router.navigate(['./menu-form', this.form.value.codemenu]);
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
    this._menuService.update(<Menu>this.form.getRawValue()/*, this.ids*/ ).subscribe(
      result => this._notificationService.success('Success', 'Menu edited successfuly'),
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
    if (this.menu.codemenu) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: `menu: ${this.menu.codemenu}`
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteBadge(this.menu.codemenu);
        }
      });
    }
  }

  deleteBadge = (codemenu): void => {
    // Call delete service
    this._menuService.delete(codemenu).subscribe(
      result => {
        this._router.navigate(['./menu-list']);

        this._notificationService.success(
          'Deleted',
          `The menu entry with the id(s)='${codemenu}' was deleted successfuly`);
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
