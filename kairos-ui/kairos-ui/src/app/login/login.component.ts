import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls:   ['./login.component.css']
})
export class LoginComponent implements OnInit  {
	 public form: FormGroup;

	 //@Output() eventLogin = new EventEmitter<any>(); 

	message = '';
	// private name: string;
	// name = new FormControl();
	// private password: string;
  // password= new FormControl();

	constructor(
				public _authService: AuthService,
				private _router: Router,
				private _formBuilder: FormBuilder
				) { }

	ngOnInit() {
		this.form = this._formBuilder.group( {
																					name: '', 
																					password: '', 
																					datedebut: '01/01/2020'});
		// console.log(this.form.get('datedebut').value);
		this.logout();
		this.message = this._authService.isLoggedIn ?  'Vous êtes connecté.' :
										'Vous êtes déconnecté. (fbockelee/kairos)';
	}

	// Informe l'utilisateur sur son authentfication.
	setMessage() {
		this.message = this._authService.isLoggedIn ?
			'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
	}

	// Connecte l'utilisateur auprès du Guard
	login() {
		this.message = 'Tentative de connexion en cours ...';
		// console.log('this.name=' + this.form.get('name').value);

		this._authService.login(this.form.get('name').value, this.form.get('password').value).subscribe(() => {
			this.setMessage();
			if (this._authService.isLoggedIn) {
				// Récupère l'URL de redirection depuis le service d'authentification
				// Si aucune redirection n'a été définis, redirige l'utilisateur vers la liste des pokemons.
				//let redirect = this._authService.redirectUrl ? this._authService.redirectUrl : '';
				// Redirige l'utilisateur
				//this.router.navigate([redirect]);
				//this._router.routeReuseStrategy.shouldReuseRoute = () => false;
				//this._router.onSameUrlNavigation = 'reload';
				// this.eventLogin.emit();
				//this._router.navigate(['/menu-list']);
			} else {
				this.form.get('password').setValue('');
			}
		});
	}

	// Déconnecte l'utilisateur
	logout() {
		this._authService.logout();
		this.setMessage();
	}

	update() {
	}
}
