// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-01-20 ( Time 14:01:01 )

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  public navigation = [
		{ title: 'Menu', routerLink: 'menu-list' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
