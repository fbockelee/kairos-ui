// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-27 ( Time 15:44:21 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-contrat-listheader',
  templateUrl: './contrat-listheader.component.html',
  styleUrls: ['./contrat-listheader.component.css'],
  providers: []
})
export class ContratListheaderComponent implements OnInit, OnChanges {

  public title = 'Liste de Contrats';
  public filter:string = 'FULL';

  private columnDefinitions = [
      { def: 'contratid', showMobile: true },
      { def: 'reference', showMobile: true },
      { def: 'idclient', showMobile: true },
	];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }
 
}
