
import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from '../services/etudiant.service';
import { Router } from '@angular/router';
import { Groupe } from '../model/groupe.model';

@Component({
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  styles: []
})
export class UpdateEtudiantComponent implements OnInit {

  currentEtudiant = new Etudiant();
  groupes!: Groupe[];
  updatedGroupeId!: number;

  constructor(private activatedRoute: ActivatedRoute,
    private etudiantService: EtudiantService,
    private router: Router,

  ) { }
  ngOnInit() {
    this.etudiantService.listeGroupes().
      subscribe(GP => {
        this.groupes = GP._embedded.groupes;
        console.log(GP);
      });
    this.etudiantService.consulterEtudiant(this.activatedRoute.snapshot.params['id']).
      subscribe(etud => {
        this.currentEtudiant = etud;
        this.updatedGroupeId =
          this.currentEtudiant.groupe.idGroupe;
      });
  }
  updateEtudiant() {
    this.currentEtudiant.groupe = this.groupes.
 find(gp => gp.idGroupe == this.updatedGroupeId)!;
    this.etudiantService.updateEtudiant(this.currentEtudiant).subscribe(etud => {
      this.router.navigate(['etudiants']);
    }
    );
  }
}
