import { Groupe } from "./groupe.model";
export class Etudiant {
  idEtudiant!: number;
  nom! : string;
  prenom! : string;
  classe!: string;
  email!: string;
  dateNaiss! : Date ;
  groupe!:Groupe;
  }
