import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppTopBarComponent } from './app.topbar.component';
import {DropdownModule, SharedModule} from 'primeng/primeng';

@NgModule({
   imports: [
	DropdownModule,
	SharedModule,
	FormsModule
],
   exports: [AppTopBarComponent],
   declarations: [AppTopBarComponent],
   providers: [],
})

export class AppTopBarModule {
}