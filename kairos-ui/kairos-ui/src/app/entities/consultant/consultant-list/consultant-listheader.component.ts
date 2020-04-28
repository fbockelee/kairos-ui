// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-27 ( Time 15:44:19 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-consultant-listheader',
  templateUrl: './consultant-listheader.component.html',
  styleUrls: ['./consultant-listheader.component.css'],
  providers: []
})
export class ConsultantListheaderComponent implements OnInit, OnChanges {

  public title = 'Liste de Consultants';
  public filter:string = 'FULL';

  private columnDefinitions = [
      { def: 'trigramme', showMobile: true },
      { def: 'nom', showMobile: true },
      { def: 'prenom', showMobile: true },
      { def: 'datedebut', showMobile: true },
      { def: 'datefin', showMobile: true },
	];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }
 
}
