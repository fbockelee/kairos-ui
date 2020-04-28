// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-28 ( Time 12:07:23 )

import { RestService } from 'angular4-hal';
import { Injectable, Injector } from '@angular/core';
import { Consultant } from '../consultant.model';

@Injectable()
export class ConsultantService extends RestService<Consultant>  {

    /**
     * Constructor
     * @param _http Http
     * @param _configuration Configuration
     */
    constructor(injector: Injector) {
        super(Consultant, 'consultant', injector);
    }

}
