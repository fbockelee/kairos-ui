// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-14 ( Time 11:35:55 )

import { RestService } from 'angular4-hal';
import { Injectable, Injector } from '@angular/core';
import { Menu } from '../menu.model';

@Injectable()
export class MenuService extends RestService<Menu>  {

    /**
     * Constructor
     * @param _http Http
     * @param _configuration Configuration
     */
    constructor(injector: Injector) {
        super(Menu, 'menu', injector);
    }

}
