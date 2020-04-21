//import { AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {NgModule} from '@angular/core';
import { FormsModule} from '@angular/forms';
//import { AppTopBarComponent } from './app.topbar.component';
//import { AppFooterComponent } from './app.footer.component';
//import { DashboardComponent } from './pages/dashboard.component';
import {TableModule} from 'primeng/table';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import {PaginatorModule} from 'primeng/paginator';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {PasswordModule} from 'primeng/password';
import {PanelModule } from 'primeng/primeng';


@NgModule({
	exports: [
		FormsModule,
        ScrollPanelModule,
        ButtonModule,
		DropdownModule,
		CardModule,
		TableModule,
		PaginatorModule,
		InputTextModule,
		TabViewModule,
		CheckboxModule,
		CalendarModule,
		PasswordModule,
		PanelModule
    ]
})
export class PrimengModule {}


