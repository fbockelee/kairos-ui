import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls:   ['./login.component.css']
})
export class LoginComponent implements OnInit  {
	 public form: FormGroup;

	message: string = 'Vous êtes déconnecté. (pikachu/pikachu)';
	// private name: string;
	// name = new FormControl();
	// private password: string;
  // password= new FormControl();

	constructor(
				public authService: AuthService,
				private router: Router,
				private _formBuilder: FormBuilder
				) { }

	ngOnInit() {
    this.form = this._formBuilder.group( {name:'', password: ''});
	}
	
	// Informe l'utilisateur sur son authentfication.
	setMessage() {
		this.message = this.authService.isLoggedIn ?
			'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
	}

	// Connecte l'utilisateur auprès du Guard
	login() {
		this.message = 'Tentative de connexion en cours ...';
		console.log('this.name='+this.form.get('name').value);

		this.authService.login(this.form.get('name').value, this.form.get('password').value).subscribe(() => {
			this.setMessage();
			if (this.authService.isLoggedIn) {
				// Récupère l'URL de redirection depuis le service d'authentification
				// Si aucune redirection n'a été définis, redirige l'utilisateur vers la liste des pokemons.
				let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
				// Redirige l'utilisateur
				this.router.navigate([redirect]);
			} else {
				this.form.get('password').setValue('');
			}
		});
	}

	// Déconnecte l'utilisateur
	logout() {
		this.authService.logout();
		this.setMessage();
	}

	update() {
	}
}