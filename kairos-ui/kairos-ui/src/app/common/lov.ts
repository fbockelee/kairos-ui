
import { NotificationService } from './../services/notification.service';

// Pour gestion des listes
import { ListeService } from './../entities/liste/services/liste.service';
import { Liste } from './../entities/liste/liste.model';

import {SelectItem} from 'primeng/api';

export class Lov {
	
	
	  /**
   * Get all LOV using the service ListeService
   */
  constructor(
	private _listeServicelov: ListeService,         // Pour gestion des listes
	private _notificationServiceLov: NotificationService 
	) {};
	
  getLOV = (nomliste : string): Promise<SelectItem[]> => {
	//var listListe: Liste[];

    /*const options: any = {params: [
					{key: 'nomliste', value: nomliste },
					{key: 'exactMatch', value: '1'},
                    {key: 'sort', value: 'ordretri'}
					],
                    notPaged:true
                  };
	*/
	/*
    this._listeServicelov.searchByNomliste(nomliste,options ).subscribe(
      (data: Liste[]) => {
        listListe = data;
		console.log("Taille liste :" + listListe.length);
		// return data;
		//resolve(data);
      },
      error => {
        this._notificationServiceLov.error(
          'Error',
          'An error occured when trying to reach the server');
    }).toPromise();
  	*/
		return new Promise((resolve, reject) => {
		      this._listeServicelov.searchByNomliste(nomliste)
		        .subscribe(
		         (data: Liste[]) => {
					var data_itm: SelectItem[];
					
					data_itm = [];
				    for (let c of data) {
						     data_itm.push({ 
											  label: (c.nomelement), 
										 	  value: (c.codeelement)
										   });
					}
		         	resolve(data_itm);
		         },
		         error => {
		          	reject(error);
		        }
		);
    });
  }  

  onDropdownClickLov(event: Event) {

  }

}