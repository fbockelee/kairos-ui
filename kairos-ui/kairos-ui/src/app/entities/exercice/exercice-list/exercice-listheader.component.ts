// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-27 ( Time 11:54:30 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-exercice-listheader',
  templateUrl: './exercice-listheader.component.html',
  styleUrls: ['./exercice-listheader.component.css'],
  providers: []
})
export class ExerciceListheaderComponent implements OnInit, OnChanges {

  public title = 'Liste de Exercices';
  public filter:string = 'FULL';

  private columnDefinitions = [
      { def: 'code', showMobile: true },
      { def: 'ouvert', showMobile: true },
	];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }
 
}
