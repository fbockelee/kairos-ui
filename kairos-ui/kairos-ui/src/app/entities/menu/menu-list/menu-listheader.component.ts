// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-27 ( Time 15:44:32 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-menu-listheader',
  templateUrl: './menu-listheader.component.html',
  styleUrls: ['./menu-listheader.component.css'],
  providers: []
})
export class MenuListheaderComponent implements OnInit, OnChanges {

  public title = 'Liste de Menus';
  public filter:string = 'FULL';

  private columnDefinitions = [
      { def: 'codemenu', showMobile: true },
      { def: 'nom', showMobile: true },
	];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }
 
}
