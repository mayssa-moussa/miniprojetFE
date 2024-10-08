

import { Injectable } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { Groupe } from '../model/groupe.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLGp } from '../config';
import { GroupeWrapper } from '../model/GroupeWrapped.model';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class EtudiantService {
  etudiants!: Etudiant[];
  etudiant?: Etudiant;
  //groupes: Groupe[];

  constructor(private http: HttpClient) {
    /*this.groupes = [{ idGroupe: 1, nomGroupe: "groupe1" },
    { idGroupe: 2, nomGroupe: "groupe2" }];

    /*this.etudiants = [{ idEtudiant: 1, nom: "moussa", prenom: "mayssa", dateNaiss: new Date("01/02/2000"), classe: "DSI31", email: "mayssa@gmail.com", groupe: { idGroupe: 1, nomGroupe: "groupe1" } },
    { idEtudiant: 2, nom: "makhlouf", prenom: "eya", dateNaiss: new Date("10/05/2003"), classe: "DSI32", email: "eya@gmail.com", groupe: { idGroupe: 2, nomGroupe: "groupe2" } },
    { idEtudiant: 3, nom: "sfia", prenom: "samar", dateNaiss: new Date("01/03/2004"), classe: "RSI31", email: "samar@gmail.com", groupe: { idGroupe: 1, nomGroupe: "groupe1" } }

    ];*/
  }
  listeEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(apiURL);
  }

  ajouterEtudiant(etud: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(apiURL, etud, httpOptions);
  }
  supprimerEtudiant(id: number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterEtudiant(id: number): Observable<Etudiant> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Etudiant>(url);
  }
  trierEtudiants() {
    this.etudiants = this.etudiants.sort((n1, n2) => {
      if (n1.idEtudiant! > n2.idEtudiant!) {
        return 1;
      }
      if (n1.idEtudiant! < n2.idEtudiant!) {
        return -1;
      }
      return 0;
    });
  }

  updateEtudiant(etud: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(apiURL, etud, httpOptions);
  }

  listeGroupes(): Observable<GroupeWrapper> {
    return this.http.get<GroupeWrapper>(apiURLGp);
  }


  rechercherParGroupe(idGp: number): Observable<Etudiant[]> {
    const url = `${apiURL}/etudsgp/${idGp}`; // Vérifiez que l'URL est correcte
    return this.http.get<Etudiant[]>(url);
  }
  rechercherParNom(nom: string):Observable< Etudiant[]> {
    const url = `${apiURL}/etudsByName/${nom}`;
    return this.http.get<Etudiant[]>(url);
    }
    ajouterGroupe( gp: Groupe):Observable<Groupe>{
      return this.http.post<Groupe>(apiURLGp, gp, httpOptions);
      }

}
