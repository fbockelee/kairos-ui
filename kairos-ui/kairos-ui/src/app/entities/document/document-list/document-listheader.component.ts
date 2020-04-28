// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 15:01:39 )

// Modules imports
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-document-listheader',
  templateUrl: './document-listheader.component.html',
  styleUrls: ['./document-listheader.component.css'],
  providers: []
})
export class DocumentListheaderComponent implements OnInit, OnChanges {

  public title = 'Liste de Documents';
  public filter:string = 'FULL';

  private columnDefinitions = [
      { def: 'documentid', showMobile: true },
      { def: 'type', showMobile: true },
      { def: 'ref', showMobile: true },
      { def: 'nom', showMobile: true },
	];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }
 
}
