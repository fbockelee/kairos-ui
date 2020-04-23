// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-23 ( Time 12:51:51 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-periode-listheader',
  templateUrl: './periode-listheader.component.html',
  styleUrls: ['./periode-listheader.component.css'],
  providers: []
})
export class PeriodeListheaderComponent implements OnInit, OnChanges {

  public title = 'Liste de Periodes';
  public filter:string = 'FULL';

  private columnDefinitions = [
      { def: 'codeexercice', showMobile: true },
      { def: 'code', showMobile: true },
      { def: 'nom', showMobile: true },
      { def: 'ouvert', showMobile: true },
      { def: 'actif', showMobile: true },
	];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }
 
}
