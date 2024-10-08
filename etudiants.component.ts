import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { EtudiantService } from '../services/etudiant.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css'
})
export class EtudiantsComponent implements OnInit {
  etudiants?: Etudiant[]; //un tableau de chînes de caractères
  constructor(private etudiantService: EtudiantService,public authService: AuthService) {
  }

  ngOnInit(): void {
    this.chargerEtudiants();
  }
  chargerEtudiants() {
    this.etudiantService.listeEtudiants().subscribe(etud => {
      console.log(etud);
      this.etudiants = etud;
    });
  }
  supprimerEtudiant(e: Etudiant) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.etudiantService.supprimerEtudiant(e.idEtudiant).subscribe(() => {
        console.log("etudiant supprimé");
        this.chargerEtudiants();
      });

  }

}
