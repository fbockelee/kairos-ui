// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 12:07:18 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-alerte-listheader',
  templateUrl: './alerte-listheader.component.html',
  styleUrls: ['./alerte-listheader.component.css'],
  providers: []
})
export class AlerteListheaderComponent implements OnInit, OnChanges {

  public title = 'Liste de Alertes';
  public filter:string = 'FULL';

  private columnDefinitions = [
      { def: 'code', showMobile: true },
      { def: 'description', showMobile: true },
      { def: 'email', showMobile: true },
	];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }
 
}
