// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 16:11:35 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-fournisseur-listheader',
  templateUrl: './fournisseur-listheader.component.html',
  styleUrls: ['./fournisseur-listheader.component.css'],
  providers: []
})
export class FournisseurListheaderComponent implements OnInit, OnChanges {

  public title = 'Liste de Fournisseurs';
  public filter:string = 'FULL';

  private columnDefinitions = [
      { def: 'fournisseurid', showMobile: true },
      { def: 'trigramme', showMobile: true },
      { def: 'raisonsociale', showMobile: true },
      { def: 'contact1', showMobile: true },
      { def: 'tel1Portable', showMobile: true },
      { def: 'tel1Travail', showMobile: true },
	];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }
 
}
