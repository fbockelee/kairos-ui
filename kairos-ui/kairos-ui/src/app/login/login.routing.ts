import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { LoginComponent }from './login.component';

import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ]),
    // MatDatepickerModule
  ],
  exports: [
    RouterModule,
    // MatDatepickerModule
  ],
  providers: [
    AuthService
  ]
})
export class LoginRoutingModule {}