// File generated by Telosys Tools Generator ( version 3.1.2 ) - Date 2020-04-27 ( Time 15:25:28 )

import { Router, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { HomeListComponent } from './home-list/home-list.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';

// Alerte
import { AlerteListheaderComponent } from './entities/alerte/alerte-list/alerte-listheader.component';
import { AlerteListComponent } from './entities/alerte/alerte-list/alerte-list.component';
import { AlerteFormComponent } from './entities/alerte/alerte-form/alerte-form.component';

// Baremekm
import { BaremekmListheaderComponent } from './entities/baremekm/baremekm-list/baremekm-listheader.component';
import { BaremekmListComponent } from './entities/baremekm/baremekm-list/baremekm-list.component';
import { BaremekmFormComponent } from './entities/baremekm/baremekm-form/baremekm-form.component';

// Calendrier
import { CalendrierListheaderComponent } from './entities/calendrier/calendrier-list/calendrier-listheader.component';
import { CalendrierListComponent } from './entities/calendrier/calendrier-list/calendrier-list.component';
import { CalendrierFormComponent } from './entities/calendrier/calendrier-form/calendrier-form.component';

// Client
import { ClientListheaderComponent } from './entities/client/client-list/client-listheader.component';
import { ClientListComponent } from './entities/client/client-list/client-list.component';
import { ClientFormComponent } from './entities/client/client-form/client-form.component';

// Conge
import { CongeListheaderComponent } from './entities/conge/conge-list/conge-listheader.component';
import { CongeListComponent } from './entities/conge/conge-list/conge-list.component';
import { CongeFormComponent } from './entities/conge/conge-form/conge-form.component';

// Consultant
import { ConsultantListheaderComponent } from './entities/consultant/consultant-list/consultant-listheader.component';
import { ConsultantListComponent } from './entities/consultant/consultant-list/consultant-list.component';
import { ConsultantFormComponent } from './entities/consultant/consultant-form/consultant-form.component';

// Consultantcontrat
import { ConsultantcontratListheaderComponent } from './entities/consultantcontrat/consultantcontrat-list/consultantcontrat-listheader.component';
import { ConsultantcontratListComponent } from './entities/consultantcontrat/consultantcontrat-list/consultantcontrat-list.component';
import { ConsultantcontratFormComponent } from './entities/consultantcontrat/consultantcontrat-form/consultantcontrat-form.component';

// Consultantcontratfournisseur
import { ConsultantcontratfournisseurListheaderComponent } from './entities/consultantcontratfournisseur/consultantcontratfournisseur-list/consultantcontratfournisseur-listheader.component';
import { ConsultantcontratfournisseurListComponent } from './entities/consultantcontratfournisseur/consultantcontratfournisseur-list/consultantcontratfournisseur-list.component';
import { ConsultantcontratfournisseurFormComponent } from './entities/consultantcontratfournisseur/consultantcontratfournisseur-form/consultantcontratfournisseur-form.component';

// Contrat
import { ContratListheaderComponent } from './entities/contrat/contrat-list/contrat-listheader.component';
import { ContratListComponent } from './entities/contrat/contrat-list/contrat-list.component';
import { ContratFormComponent } from './entities/contrat/contrat-form/contrat-form.component';

// Contratfournisseur
import { ContratfournisseurListheaderComponent } from './entities/contratfournisseur/contratfournisseur-list/contratfournisseur-listheader.component';
import { ContratfournisseurListComponent } from './entities/contratfournisseur/contratfournisseur-list/contratfournisseur-list.component';
import { ContratfournisseurFormComponent } from './entities/contratfournisseur/contratfournisseur-form/contratfournisseur-form.component';

// Cra
import { CraListheaderComponent } from './entities/cra/cra-list/cra-listheader.component';
import { CraListComponent } from './entities/cra/cra-list/cra-list.component';
import { CraFormComponent } from './entities/cra/cra-form/cra-form.component';

// Document
import { DocumentListheaderComponent } from './entities/document/document-list/document-listheader.component';
import { DocumentListComponent } from './entities/document/document-list/document-list.component';
import { DocumentFormComponent } from './entities/document/document-form/document-form.component';

// Echeancecontrat
import { EcheancecontratListheaderComponent } from './entities/echeancecontrat/echeancecontrat-list/echeancecontrat-listheader.component';
import { EcheancecontratListComponent } from './entities/echeancecontrat/echeancecontrat-list/echeancecontrat-list.component';
import { EcheancecontratFormComponent } from './entities/echeancecontrat/echeancecontrat-form/echeancecontrat-form.component';

// Echeancecontratfournisseur
import { EcheancecontratfournisseurListheaderComponent } from './entities/echeancecontratfournisseur/echeancecontratfournisseur-list/echeancecontratfournisseur-listheader.component';
import { EcheancecontratfournisseurListComponent } from './entities/echeancecontratfournisseur/echeancecontratfournisseur-list/echeancecontratfournisseur-list.component';
import { EcheancecontratfournisseurFormComponent } from './entities/echeancecontratfournisseur/echeancecontratfournisseur-form/echeancecontratfournisseur-form.component';

// Exercice
import { ExerciceListheaderComponent } from './entities/exercice/exercice-list/exercice-listheader.component';
import { ExerciceListComponent } from './entities/exercice/exercice-list/exercice-list.component';
import { ExerciceFormComponent } from './entities/exercice/exercice-form/exercice-form.component';

// Fournisseur
import { FournisseurListheaderComponent } from './entities/fournisseur/fournisseur-list/fournisseur-listheader.component';
import { FournisseurListComponent } from './entities/fournisseur/fournisseur-list/fournisseur-list.component';
import { FournisseurFormComponent } from './entities/fournisseur/fournisseur-form/fournisseur-form.component';

// Frais
import { FraisListheaderComponent } from './entities/frais/frais-list/frais-listheader.component';
import { FraisListComponent } from './entities/frais/frais-list/frais-list.component';
import { FraisFormComponent } from './entities/frais/frais-form/frais-form.component';

// Fraiskmunit
import { FraiskmunitListheaderComponent } from './entities/fraiskmunit/fraiskmunit-list/fraiskmunit-listheader.component';
import { FraiskmunitListComponent } from './entities/fraiskmunit/fraiskmunit-list/fraiskmunit-list.component';
import { FraiskmunitFormComponent } from './entities/fraiskmunit/fraiskmunit-form/fraiskmunit-form.component';

// Fraisunit
import { FraisunitListheaderComponent } from './entities/fraisunit/fraisunit-list/fraisunit-listheader.component';
import { FraisunitListComponent } from './entities/fraisunit/fraisunit-list/fraisunit-list.component';
import { FraisunitFormComponent } from './entities/fraisunit/fraisunit-form/fraisunit-form.component';

// Liencontrat
import { LiencontratListheaderComponent } from './entities/liencontrat/liencontrat-list/liencontrat-listheader.component';
import { LiencontratListComponent } from './entities/liencontrat/liencontrat-list/liencontrat-list.component';
import { LiencontratFormComponent } from './entities/liencontrat/liencontrat-form/liencontrat-form.component';

// Liste
import { ListeListheaderComponent } from './entities/liste/liste-list/liste-listheader.component';
import { ListeListComponent } from './entities/liste/liste-list/liste-list.component';
import { ListeFormComponent } from './entities/liste/liste-form/liste-form.component';

// Menu
import { MenuListheaderComponent } from './entities/menu/menu-list/menu-listheader.component';
import { MenuListComponent } from './entities/menu/menu-list/menu-list.component';
import { MenuFormComponent } from './entities/menu/menu-form/menu-form.component';

// Periode
import { PeriodeListheaderComponent } from './entities/periode/periode-list/periode-listheader.component';
import { PeriodeListComponent } from './entities/periode/periode-list/periode-list.component';
import { PeriodeFormComponent } from './entities/periode/periode-form/periode-form.component';

// Postebudgetaire
import { PostebudgetaireListheaderComponent } from './entities/postebudgetaire/postebudgetaire-list/postebudgetaire-listheader.component';
import { PostebudgetaireListComponent } from './entities/postebudgetaire/postebudgetaire-list/postebudgetaire-list.component';
import { PostebudgetaireFormComponent } from './entities/postebudgetaire/postebudgetaire-form/postebudgetaire-form.component';

// Reliquat
import { ReliquatListheaderComponent } from './entities/reliquat/reliquat-list/reliquat-listheader.component';
import { ReliquatListComponent } from './entities/reliquat/reliquat-list/reliquat-list.component';
import { ReliquatFormComponent } from './entities/reliquat/reliquat-form/reliquat-form.component';

// Rubrique
import { RubriqueListheaderComponent } from './entities/rubrique/rubrique-list/rubrique-listheader.component';
import { RubriqueListComponent } from './entities/rubrique/rubrique-list/rubrique-list.component';
import { RubriqueFormComponent } from './entities/rubrique/rubrique-form/rubrique-form.component';

// Rubriquefrais
import { RubriquefraisListheaderComponent } from './entities/rubriquefrais/rubriquefrais-list/rubriquefrais-listheader.component';
import { RubriquefraisListComponent } from './entities/rubriquefrais/rubriquefrais-list/rubriquefrais-list.component';
import { RubriquefraisFormComponent } from './entities/rubriquefrais/rubriquefrais-form/rubriquefrais-form.component';

// Valocontrat
import { ValocontratListheaderComponent } from './entities/valocontrat/valocontrat-list/valocontrat-listheader.component';
import { ValocontratListComponent } from './entities/valocontrat/valocontrat-list/valocontrat-list.component';
import { ValocontratFormComponent } from './entities/valocontrat/valocontrat-form/valocontrat-form.component';

export const AppRouting = RouterModule.forRoot([
    { path: '', 
      //component: HomeListComponent
      redirectTo: 'login',
      pathMatch: 'full' 
    },
    // { canActivate : [AuthGuard],
    //  children: [
        { path: 'alerte-list', component: AlerteListheaderComponent, canActivate : [AuthGuard]},
        { path: 'alerte-form/:id', component: AlerteFormComponent, canActivate : [AuthGuard] },
        { path: 'alerte-form', component: AlerteFormComponent, canActivate : [AuthGuard] },
        { path: 'baremekm-list', component: BaremekmListheaderComponent, canActivate : [AuthGuard]},
        { path: 'baremekm-form/:id1/:id2', component: BaremekmFormComponent, canActivate : [AuthGuard] },
        { path: 'baremekm-form', component: BaremekmFormComponent, canActivate : [AuthGuard] },
        { path: 'calendrier-list', component: CalendrierListheaderComponent, canActivate : [AuthGuard]},
        { path: 'calendrier-form/:id', component: CalendrierFormComponent, canActivate : [AuthGuard] },
        { path: 'calendrier-form', component: CalendrierFormComponent, canActivate : [AuthGuard] },
        { path: 'client-list', component: ClientListheaderComponent, canActivate : [AuthGuard]},
        { path: 'client-form/:id', component: ClientFormComponent, canActivate : [AuthGuard] },
        { path: 'client-form', component: ClientFormComponent, canActivate : [AuthGuard] },
        { path: 'conge-list', component: CongeListheaderComponent, canActivate : [AuthGuard]},
        { path: 'conge-form/:id', component: CongeFormComponent, canActivate : [AuthGuard] },
        { path: 'conge-form', component: CongeFormComponent, canActivate : [AuthGuard] },
        { path: 'consultant-list', component: ConsultantListheaderComponent, canActivate : [AuthGuard]},
        { path: 'consultant-form/:id', component: ConsultantFormComponent, canActivate : [AuthGuard] },
        { path: 'consultant-form', component: ConsultantFormComponent, canActivate : [AuthGuard] },
        { path: 'consultantcontrat-list', component: ConsultantcontratListheaderComponent, canActivate : [AuthGuard]},
        { path: 'consultantcontrat-form/:id1/:id2', component: ConsultantcontratFormComponent, canActivate : [AuthGuard] },
        { path: 'consultantcontrat-form', component: ConsultantcontratFormComponent, canActivate : [AuthGuard] },
        { path: 'consultantcontratfournisseur-list', component: ConsultantcontratfournisseurListheaderComponent, canActivate : [AuthGuard]},
        { path: 'consultantcontratfournisseur-form/:id1/:id2', component: ConsultantcontratfournisseurFormComponent, canActivate : [AuthGuard] },
        { path: 'consultantcontratfournisseur-form', component: ConsultantcontratfournisseurFormComponent, canActivate : [AuthGuard] },
        { path: 'contrat-list', component: ContratListheaderComponent, canActivate : [AuthGuard]},
        { path: 'contrat-form/:id', component: ContratFormComponent, canActivate : [AuthGuard] },
        { path: 'contrat-form', component: ContratFormComponent, canActivate : [AuthGuard] },
        { path: 'contratfournisseur-list', component: ContratfournisseurListheaderComponent, canActivate : [AuthGuard]},
        { path: 'contratfournisseur-form/:id', component: ContratfournisseurFormComponent, canActivate : [AuthGuard] },
        { path: 'contratfournisseur-form', component: ContratfournisseurFormComponent, canActivate : [AuthGuard] },
        { path: 'cra-list', component: CraListheaderComponent, canActivate : [AuthGuard]},
        { path: 'cra-form/:id', component: CraFormComponent, canActivate : [AuthGuard] },
        { path: 'cra-form', component: CraFormComponent, canActivate : [AuthGuard] },
        { path: 'document-list', component: DocumentListheaderComponent, canActivate : [AuthGuard]},
        { path: 'document-form/:id', component: DocumentFormComponent, canActivate : [AuthGuard] },
        { path: 'document-form', component: DocumentFormComponent, canActivate : [AuthGuard] },
        { path: 'echeancecontrat-list', component: EcheancecontratListheaderComponent, canActivate : [AuthGuard]},
        { path: 'echeancecontrat-form/:id', component: EcheancecontratFormComponent, canActivate : [AuthGuard] },
        { path: 'echeancecontrat-form', component: EcheancecontratFormComponent, canActivate : [AuthGuard] },
        { path: 'echeancecontratfournisseur-list', component: EcheancecontratfournisseurListheaderComponent, canActivate : [AuthGuard]},
        { path: 'echeancecontratfournisseur-form/:id', component: EcheancecontratfournisseurFormComponent, canActivate : [AuthGuard] },
        { path: 'echeancecontratfournisseur-form', component: EcheancecontratfournisseurFormComponent, canActivate : [AuthGuard] },
        { path: 'exercice-list', component: ExerciceListheaderComponent, canActivate : [AuthGuard]},
        { path: 'exercice-form/:id', component: ExerciceFormComponent, canActivate : [AuthGuard] },
        { path: 'exercice-form', component: ExerciceFormComponent, canActivate : [AuthGuard] },
        { path: 'fournisseur-list', component: FournisseurListheaderComponent, canActivate : [AuthGuard]},
        { path: 'fournisseur-form/:id', component: FournisseurFormComponent, canActivate : [AuthGuard] },
        { path: 'fournisseur-form', component: FournisseurFormComponent, canActivate : [AuthGuard] },
        { path: 'frais-list', component: FraisListheaderComponent, canActivate : [AuthGuard]},
        { path: 'frais-form/:id', component: FraisFormComponent, canActivate : [AuthGuard] },
        { path: 'frais-form', component: FraisFormComponent, canActivate : [AuthGuard] },
        { path: 'fraiskmunit-list', component: FraiskmunitListheaderComponent, canActivate : [AuthGuard]},
        { path: 'fraiskmunit-form/:id', component: FraiskmunitFormComponent, canActivate : [AuthGuard] },
        { path: 'fraiskmunit-form', component: FraiskmunitFormComponent, canActivate : [AuthGuard] },
        { path: 'fraisunit-list', component: FraisunitListheaderComponent, canActivate : [AuthGuard]},
        { path: 'fraisunit-form/:id', component: FraisunitFormComponent, canActivate : [AuthGuard] },
        { path: 'fraisunit-form', component: FraisunitFormComponent, canActivate : [AuthGuard] },
        { path: 'liencontrat-list', component: LiencontratListheaderComponent, canActivate : [AuthGuard]},
        { path: 'liencontrat-form/:id1/:id2/:id3/:id4', component: LiencontratFormComponent, canActivate : [AuthGuard] },
        { path: 'liencontrat-form', component: LiencontratFormComponent, canActivate : [AuthGuard] },
        { path: 'liste-list', component: ListeListheaderComponent, canActivate : [AuthGuard]},
        { path: 'liste-form/:id1/:id2', component: ListeFormComponent, canActivate : [AuthGuard] },
        { path: 'liste-form', component: ListeFormComponent, canActivate : [AuthGuard] },
        { path: 'menu-list', component: MenuListheaderComponent, canActivate : [AuthGuard]},
        { path: 'menu-form/:id', component: MenuFormComponent, canActivate : [AuthGuard] },
        { path: 'menu-form', component: MenuFormComponent, canActivate : [AuthGuard] },
        { path: 'periode-list', component: PeriodeListheaderComponent, canActivate : [AuthGuard]},
        { path: 'periode-form/:id', component: PeriodeFormComponent, canActivate : [AuthGuard] },
        { path: 'periode-form', component: PeriodeFormComponent, canActivate : [AuthGuard] },
        { path: 'postebudgetaire-list', component: PostebudgetaireListheaderComponent, canActivate : [AuthGuard]},
        { path: 'postebudgetaire-form/:id', component: PostebudgetaireFormComponent, canActivate : [AuthGuard] },
        { path: 'postebudgetaire-form', component: PostebudgetaireFormComponent, canActivate : [AuthGuard] },
        { path: 'reliquat-list', component: ReliquatListheaderComponent, canActivate : [AuthGuard]},
        { path: 'reliquat-form/:id1/:id2/:id3', component: ReliquatFormComponent, canActivate : [AuthGuard] },
        { path: 'reliquat-form', component: ReliquatFormComponent, canActivate : [AuthGuard] },
        { path: 'rubrique-list', component: RubriqueListheaderComponent, canActivate : [AuthGuard]},
        { path: 'rubrique-form/:id', component: RubriqueFormComponent, canActivate : [AuthGuard] },
        { path: 'rubrique-form', component: RubriqueFormComponent, canActivate : [AuthGuard] },
        { path: 'rubriquefrais-list', component: RubriquefraisListheaderComponent, canActivate : [AuthGuard]},
        { path: 'rubriquefrais-form/:id', component: RubriquefraisFormComponent, canActivate : [AuthGuard] },
        { path: 'rubriquefrais-form', component: RubriquefraisFormComponent, canActivate : [AuthGuard] },
        { path: 'valocontrat-list', component: ValocontratListheaderComponent, canActivate : [AuthGuard]},
        { path: 'valocontrat-form/:id', component: ValocontratFormComponent, canActivate : [AuthGuard] },
        { path: 'valocontrat-form', component: ValocontratFormComponent, canActivate : [AuthGuard] },
        { path: 'deconnect', component: LoginComponent },
        { path: 'about', component: AboutComponent },
    { path: '**',
      redirectTo: 'login',
      //component: NotFoundComponent 
    }
]);