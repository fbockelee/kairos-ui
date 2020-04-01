//import { AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {NgModule} from '@angular/core';
import { FormsModule} from '@angular/forms';
//import { AppTopBarComponent } from './app.topbar.component';
//import { AppFooterComponent } from './app.footer.component';
//import { DashboardComponent } from './pages/dashboard.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
	exports: [
		FormsModule,
        ScrollPanelModule,
        ButtonModule,
		DropdownModule
    ]
})
export class PrimengModule {}


