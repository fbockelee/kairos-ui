// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-01-20 ( Time 13:33:09 )

import { NotificationService } from './services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Services imports
import { ConsultantService } from './entities/consultant/services/consultant.service';
import { AuthService } from './services/auth.service';
import { EmitterService } from './services/emitter.service';
import { Router } from '@angular/router';

// Models imports
import { Consultant } from './entities/consultant/consultant.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component2.html',
  styleUrls: ['./app.component2.css']
})
export class AppComponent2 implements OnInit {

  title: String = 'Home';
  public form: FormGroup;
  public currentConsultant: Consultant = new Consultant();
  public connectedConsultant: Consultant = new Consultant();


  public listOfConsultants: Consultant[];


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
    private _formBuilder: FormBuilder,
    private _consultantService: ConsultantService,
	private _router: Router,
    private _authService: AuthService,
    ) { }

  ngOnInit() {
    const options: any = {params: [
                    {key: 'sort', value: 'nom'}
                    ],
                    notPaged:true
                  };

    this._notificationService.init();
    this.form = this._formBuilder.group({
          consultant: ''
    });

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
    	//this.currentConsultant = this._authService.getCurrentConsultant();
    	//this.connectedConsultant= this._authService.getConnectedConsultant();
		//this.getAllListes();
		//this._router.navigate(['/menu-list']);
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
		
		//this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
   		//this._router.navigate(['/']));
	});
  }
}
