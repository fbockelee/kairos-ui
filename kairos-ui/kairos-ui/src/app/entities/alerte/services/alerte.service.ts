// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 12:07:17 )

import { RestService } from 'angular4-hal';
import { Injectable, Injector } from '@angular/core';
import { Alerte } from '../alerte.model';

@Injectable()
export class AlerteService extends RestService<Alerte>  {

    /**
     * Constructor
     * @param _http Http
     * @param _configuration Configuration
     */
    constructor(injector: Injector) {
        super(Alerte, 'alerte', injector);
    }

}
