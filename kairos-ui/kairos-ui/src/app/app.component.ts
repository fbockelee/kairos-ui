import { Component, Renderer, NgZone } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { DashboardComponent } from './pages/dashboard.component';
import { AppMenuComponent, AppSubMenuComponent} from './app.menu.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    sidebarActive: boolean;

    onMenuButtonClick(event: Event) {
        this.sidebarActive = !this.sidebarActive;

        event.preventDefault();
    }
}