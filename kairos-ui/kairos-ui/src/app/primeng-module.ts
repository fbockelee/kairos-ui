//import { AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {NgModule} from '@angular/core';
//import { AppTopBarComponent } from './app.topbar.component';
//import { AppFooterComponent } from './app.footer.component';
//import { DashboardComponent } from './pages/dashboard.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';

@NgModule({
	exports: [
        ScrollPanelModule,
        ButtonModule
    ]
})
export class PrimengModule {}


