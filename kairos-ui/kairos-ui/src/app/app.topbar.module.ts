import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { AppTopBarComponent } from './app.topbar.component';
import {DropdownModule, SharedModule} from 'primeng/primeng';

@NgModule({
   imports: [
	CommonModule,
	DropdownModule,
	SharedModule,
	FormsModule,
	BrowserModule
],
   exports: [AppTopBarComponent],
   declarations: [AppTopBarComponent],
   providers: [],
})

export class AppTopBarModule {
}