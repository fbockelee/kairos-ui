// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-03-19 ( Time 15:48:21 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Services imports
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { MenuService } from './../services/menu.service';
import { ApplicationStateService } from './../../../services/application-state.service';

// Models imports
import { Menu } from '../menu.model';

// Components imports
import { DeleteDialogComponent } from './../../../delete-dialog/delete-dialog.component';

import { DatePipe } from '@angular/common';

import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
  providers: [DatePipe]
})
export class MenuListComponent implements OnInit, OnChanges {

  public title = 'Liste de Menus';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Menu>;

  private listOfMenus: Menu[];
  private listId = 'MENU_COMPONENT_LIST';

  private menu: Menu;

  private columnDefinitions = [
      { def: 'codemenu', showMobile: true },
      { def: 'nom', showMobile: true },
	];

  constructor(
    private _menuService: MenuService,
    private _router: Router,
    private _notificationService: NotificationService,
    public dialog: MatDialog) { }

  ngOnInit() {
    // On init get all Menus
    this.getAllMenus();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Menu list
    EmitterService.get(this.listId).subscribe((data: Menu[]) => this.getAllMenus());
  }

  ngOnChanges() { }


  /**
   * Get displayed columns (responsive)
   */
  getDisplayedColumns(): string[] {
	  const isMobile = ApplicationStateService.getIsMobileResolution();
	  return this.columnDefinitions
	    .filter(cd => !isMobile || cd.showMobile)
	    .map(cd => cd.def);
	}

  /**
   * Get all Menu using the service MenuService
   */
  getAllMenus = (): void => {
    this._menuService.getAll({ notPaged: true }).subscribe(
      (data: Menu[]) => {
        this.listOfMenus = data;
        this.dataSource = new MatTableDataSource<Menu>(this.listOfMenus);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this._notificationService.error(
          'Error',
          'An error occured when trying to reach the server');
    });
  }

  editMenu = (codemenu): void => {
    // Navigate to menu form component
    this.goToMenuForm(codemenu);
  }

  deleteMenu = (codemenu): void => {

    const promise = new Promise((resolve, reject) => {
		// Call get service
		this._menuService.get(codemenu).subscribe(
        		(menu: Menu) => {
          							this.menu = menu;
          							resolve('done');
        						},
				error => {
          					this._notificationService.error(error.statusText, 'Error delete');
            				reject('error');
        				 });
	})
    .then(() => {
    	// Call delete service
    	this._menuService.delete(this.menu).subscribe(
      			result => {
       						 // Notify Menu list to refresh
        					EmitterService.get(this.listId).emit(result);

        					this._notificationService.success(
          					'Deleted',
          					`The menu entry with the id='${codemenu}' was deleted successfuly`);
     					  },
      			error => {
        					this._notificationService.error(
          					'Error',
          					'An error occured when trying to reach the server');
      					  });
  	})
  }

  goToMenuForm(codemenu) {
    this._router.navigate(['./menu-form', codemenu]);
  }

  deleteConfirmation = (codemenu) => {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: `menu: ${codemenu}`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMenu(codemenu);
      }
    });
  }

}
