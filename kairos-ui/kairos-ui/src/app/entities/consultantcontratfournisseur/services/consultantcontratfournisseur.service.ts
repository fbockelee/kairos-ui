// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 12:07:24 )

import { RestService } from 'angular4-hal';
import { Injectable, Injector } from '@angular/core';
import { Consultantcontratfournisseur } from '../consultantcontratfournisseur.model';

@Injectable()
export class ConsultantcontratfournisseurService extends RestService<Consultantcontratfournisseur>  {

    /**
     * Constructor
     * @param _http Http
     * @param _configuration Configuration
     */
    constructor(injector: Injector) {
        super(Consultantcontratfournisseur, 'consultantcontratfournisseur', injector);
    }

}
