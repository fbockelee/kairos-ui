// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-27 ( Time 15:44:24 )

import { RestService } from 'angular4-hal';
import { Injectable, Injector } from '@angular/core';
import { Echeancecontrat } from '../echeancecontrat.model';

@Injectable()
export class EcheancecontratService extends RestService<Echeancecontrat>  {

    /**
     * Constructor
     * @param _http Http
     * @param _configuration Configuration
     */
    constructor(injector: Injector) {
        super(Echeancecontrat, 'echeancecontrat', injector);
    }

}
