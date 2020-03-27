// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-01-20 ( Time 15:32:28 )

import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  template: `
    <h2 md-dialog-title>Supprimer {{ data }}</h2>
    <mat-dialog-content>Etes-vous sûr ?</mat-dialog-content>
    <mat-dialog-actions>
        <button mat-button mat-dialog-close>Non</button>
        <button mat-button [mat-dialog-close]="true">Oui</button>
    </mat-dialog-actions>
  `
})
export class DeleteDialogComponent {

  constructor(
      public dialogRef: MatDialogRef<DeleteDialogComponent>, 
      @Inject(MAT_DIALOG_DATA) public data: any) { }
}
