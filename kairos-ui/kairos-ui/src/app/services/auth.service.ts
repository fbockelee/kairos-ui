
import { Injectable } from '@angular/core';
// RxJS 6
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { tap, delay } from 'rxjs/operators';

import {Consultant} from './../entities/consultant/consultant.model';
import {ConsultantService} from './../entities/consultant/services/consultant.service';

import { EmitterService } from './../services/emitter.service';

// import {LocalStorage, SessionStorage} from "angular-localstorage";
const STORAGE_CURRENT_CONSULTANT = 'currentConsultant';
const STORAGE_CONNECTED_CONSULTANT = 'connectedConsultant';

@Injectable()
export class AuthService {

	isLoggedIn = false; // L'utilisateur est-il connecté ?
	redirectUrl: string; // où rediriger l'utilisateur après l'authentification ?

	public authId 			= 'AUTH_SERVICE';
	public authIdConnect 	= 'CONNECTED';
	public authIdDisconnect = 'DISCCONNECTED';
	
	constructor(
    	private _consultantService: ConsultantService,
    ) { }

	// Une méthode de connexion
	login(name: string, password: string): Observable<boolean> {

		// let csearch : Consultant;
		// let cfind: Consultant;
		// let isLoggedIn = (name === 'fbockelee' && password === 'kairos');
		let isLoggedIn = false;



		// csearch = new Consultant();
		// csearch.userLogin = name ;
		// csearch.userPassword = password;

		console.log('tentative de connection :' + name + '/' + password);

		const options: any = {params: [
										{key: 'exactMatch', value: '1'},
										{key: 'userLogin', value: name},
										{key: 'userPassword', value: password}
									]};

		this._consultantService.getAll(options).subscribe(
				(data: Consultant[]) => {
					console.log('' + data.length);
					//this._consultantService.
					if ( data.length === 1 ) {
						isLoggedIn = true;
						localStorage.setItem(STORAGE_CONNECTED_CONSULTANT,JSON.stringify(data[0]));
						localStorage.setItem(STORAGE_CURRENT_CONSULTANT,JSON.stringify(data[0]));
						// SessionStorage.setItem('connectedConsultant',JSON.stringify(data[0]));
						// SessionStorage.setItem('currentConsultant',JSON.stringify(data[0]));
					}
				},
				error => {
					console.log('erreur');
					//
				});

		// Faites votre appel à un service d'authentification...


		return of(true).pipe(
			delay(1000),
			tap(val => {
							this.isLoggedIn = isLoggedIn;
							// Notify Liste list to refresh
        					EmitterService.get(this.authId).emit(this.authIdConnect);							
					   })
		);
	}

	getConnectedConsultant(): Consultant {
		return JSON.parse(localStorage.getItem(STORAGE_CONNECTED_CONSULTANT));
	}

	getCurrentConsultant(): Consultant {
		return JSON.parse(localStorage.getItem(STORAGE_CURRENT_CONSULTANT));
	}

	// Une méthode de déconnexion
	logout(): void {
		this.isLoggedIn = false;
		localStorage.removeItem(STORAGE_CONNECTED_CONSULTANT);
		localStorage.removeItem(STORAGE_CURRENT_CONSULTANT);
		EmitterService.get(this.authId).emit(this.authIdDisconnect);
	}
}
