
import { Injectable } from '@angular/core';
// RxJS 6
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { tap, delay } from 'rxjs/operators';

import {Consultant} from './entities/consultant/consultant.model';
import {ConsultantService} from './entities/consultant/services/consultant.service';

@Injectable()
export class AuthService {

	isLoggedIn = false; // L'utilisateur est-il connecté ?
	redirectUrl: string; // où rediriger l'utilisateur après l'authentification ?

	constructor(
    	private _consultantService: ConsultantService,
    ) { }

	// Une méthode de connexion
	login(name: string, password: string): Observable<boolean> {

		let csearch : Consultant;
		//let cfind: Consultant;
		//let isLoggedIn = (name === 'fbockelee' && password === 'kairos');
		let isLoggedIn = false;



		//csearch = new Consultant();
		//csearch.userLogin = name ;
		//csearch.userPassword = password;

		console.log('tentative de connection :' + name + '/' + password);

		let options: any = {params: [
										{key: 'userLogin', value: name},
										{key: 'userPassword', value: password}
									]};
	  
		this._consultantService.getAll(options).subscribe(
				(data: Consultant[]) => {
					console.log(''+data.length);
					//this._consultantService.
					if ( data.length > 0 ) {
						isLoggedIn = true;
					}
				},
				error => {
					console.log('erreur');
					//
				});

		// Faites votre appel à un service d'authentification...


		return of(true).pipe(
			delay(1000),
			tap(val => this.isLoggedIn = isLoggedIn)
		);
	}

	// Une méthode de déconnexion
	logout(): void {
		this.isLoggedIn = false;
	}
}
