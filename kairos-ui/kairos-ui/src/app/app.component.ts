import { Component, Renderer, NgZone, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { DashboardComponent } from './pages/dashboard.component';
import { AppMenuComponent, AppSubMenuComponent} from './app.menu.component';

// Services imports
import { ConsultantService } from './entities/consultant/services/consultant.service';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { EmitterService } from './services/emitter.service';
import { Router } from '@angular/router';

//import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models imports
import { Consultant } from './entities/consultant/consultant.model';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit  {

  title: String = 'Home';
  //public form: FormGroup;
  public currentConsultant: Consultant = new Consultant();
  public connectedConsultant: Consultant = new Consultant();

  public listOfConsultants: Consultant[];
    sidebarActive: boolean;

  public navigation = [
    { title: 'Menu', routerLink: 'menu-list' },
    { title: 'Consultant', routerLink: 'consultant-list' },
	{ title: 'Liste', routerLink: 'liste-list' }
  ];

  public optionsForNotifications = {
    position: ['bottom', 'center'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: true,
    preventDuplicates: true
  };

  constructor(
    private _notificationService: NotificationService,
    //private _formBuilder: FormBuilder,
    private _consultantService: ConsultantService,
	private _router: Router,
    private _authService: AuthService,
    ) { }

    onMenuButtonClick(event: Event) {
        this.sidebarActive = !this.sidebarActive;

        event.preventDefault();
    }

ngOnInit() {
	    const options: any = {params: [
	                    {key: 'sort', value: 'nom,prenom'}
	                    ],
	                    notPaged:true
	                  };
	
	    this._notificationService.init();
		/*
	    this.form = this._formBuilder.group({
	          consultant: ''
	    });
		*/
		
	    this.currentConsultant = this._authService.getCurrentConsultant();
	    this.connectedConsultant= this._authService.getConnectedConsultant();
	    //console.log(this.currentConsultant);
	    this._consultantService.getAll(options).subscribe(
	      (data: Consultant[]) => {
	        this.listOfConsultants = data;
	        //this.setPage(1);
	      },
	      error => {
	        this._notificationService.error(
	          'Error',
	          'An error occured when trying to reach the server');
	    });
		// Détecter les connections, reconnections
		EmitterService.get(this._authService.authId).subscribe((result: String) => {
			// Rafraichir App
			if ( result == this._authService.authIdConnect) {
			    this.currentConsultant = this._authService.getCurrentConsultant();
			    this.connectedConsultant= this._authService.getConnectedConsultant();
				this._router.navigate(['/menu-list']); // Page par défaut : peut être mettre autre chose ?
			}
			else {
			    this.currentConsultant = null;
			    this.connectedConsultant= null;
				this._router.navigate(['/']); //Etant déconnecté on va arriver au login
			}
		});
	}
}