import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem, ScrollPanel } from 'primeng/primeng';
import { AppComponent } from './app.component';

import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';

import { MenuService } from './entities/menu/services/menu.service';
import { Menu } from './entities/menu/menu.model';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit, AfterViewInit {



  model: any[];


    @ViewChild('scrollPanel') layoutMenuScrollerViewChild: ScrollPanel;

    constructor(public app: AppComponent,
	   			private _notificationService: NotificationService,
	    		private _menuService: MenuService,
				private _authService: AuthService
				) {}

    ngAfterViewInit() {
        setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

    ngOnInit() {
	
		    const options: any = {params: [
	                    // {key: 'sort', value: 'nom,prenom'}
	                    ],
	                    notPaged:true
	                  };

	    this._menuService.getAll(options).subscribe(
	      (data: Menu[]) => {
		
			var listOfMenus: Menu[];
			var listOfMenusAdmin_itm: MenuItem[] = [];
			var listOfMenusConsultant_itm: MenuItem[] = [];
			var listOfMenusSt_itm: MenuItem[] = [];
			
	        listOfMenus = data;

		    for (let c of listOfMenus) {
			    var url = c.url;
				
				var consultantid = this._authService.getCurrentConsultant().consultantid;
				console.log('avant ' + c.url);
				url = url.replace('/:consultantid/g',consultantid.toString());
				console.log('apres ' + url);
				
				// remplacer :consultantid par l'id du consultant connecté 
				
			  	if (c.profils.includes('ADMIN')) {
				      listOfMenusAdmin_itm.push({ 
														label: 		(c.nom), 
														routerLink: (url)
												});
				}
			  	if (c.profils.includes('CONSULTANT')) {
				      listOfMenusConsultant_itm.push({ 
														label: 		(c.nom), 
														routerLink: (url)
												});
				}	
			  	if (c.profils.includes('ST')) {
				      listOfMenusSt_itm.push({ 
														label: 		(c.nom), 
														routerLink: (url)
												});
				}							
			  //this.listOfConsultants_itm.push({ label: (c.trigramme), value: c.consultantid });
		    }

	       this.model = [
	            { label: 'Dashboard', routerLink: ['/'] },
	            {
	                label: 'Entités',
	                items: [
	                         { label: 'Menu', routerLink: ['menu-list']  },
	                         { label: 'Consultant', routerLink: ['consultant-list']  },
	                         { label: 'Liste', routerLink: ['liste-list']  },
							 { label: 'Fournisseur', routerLink: ['fournisseur-list']  },
						 	 { label: 'Période', routerLink: ['periode-list']  },
							 { label: 'Calendrier', routerLink: ['calendrier-list']  },
	                        ]
	             },
	            {
	                label: 'Menu Consultant',
	                items:  listOfMenusConsultant_itm
	             },
	            {
	                label: 'Menu Administrateur',
	                items: listOfMenusAdmin_itm
	             },
	            {
	                label: 'Menu Sous-traitant',
	                items: listOfMenusSt_itm
	             },
	        ];
			        //this.setPage(1);
	      },
	      error => {
	        this._notificationService.error(
	          'Error',
	          'An error occured when trying to reach the server');
	    });	
	
 
    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink" [attr.target]="child.target">
                    <span class="menuitem-text">{{child.label}}</span>
                    <i class="fa fa-chevron-down layout-submenu-toggler" *ngIf="child.items"></i>
                </a>
                <a (click)="itemClick($event,child,i)" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                    [routerLinkActiveOptions]="{exact: true}" [attr.target]="child.target">
                    <span class="menuitem-text">{{child.label}}</span>
                    <i class="fa fa-chevron-down layout-submenu-toggler" *ngIf="child.items"></i>
                </a>
                <ul app-submenu [item]="child" *ngIf="child.items" [@children]="isActive(i) ? 'visible' : 'hidden'"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('visible', style({
                height: '*'
            })),
            state('hidden', style({
                height: '0px'
            })),
            transition('visible => hidden', animate('600ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('600ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    activeIndex: number;

    hover: boolean;

    constructor(public app: AppComponent, public appMenu: AppMenuComponent) { }

    itemClick(event: Event, item: MenuItem, index: number)  {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        if (item.routerLink || item.items || item.command || item.url) {
            this.activeIndex = (this.activeIndex as number === index) ? -1 : index;
        }

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.appMenu.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            //this.app.sidebarActive = false;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

}