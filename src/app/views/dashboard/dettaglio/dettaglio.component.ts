import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentiDto } from '../../../services/studenti.service';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.scss']
})
export class DettaglioComponent implements OnInit {

  form: FormGroup;
  id: number = null;
  request: any = null;
  loading: boolean = false;
  studente: StudentiDto;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  get f() {
    return this.form.controls;
  }  

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      cognome: [null, [Validators.required]]
    });
    this.route.params.subscribe(values => {
      this.route.data.subscribe(data => {
        this.id = values.id;
      });
    });
    setTimeout(() => {
      if (this.id == 1) {
        this.studente = {
          id: this.id,
          nome: "Marco",
          cognome: "Panozzo"
        }
      } else if (this.id == 2) {
        this.studente = {
          id: this.id,
          nome: "Matteo",
          cognome: "Solivo"
        }
      } else if (this.id == 3) {
        this.studente = {
          id: this.id,
          nome: "Dardan",
          cognome: "baljaj"
        }
      } else {
        this.studente = {
          id: this.id,
          nome: "Utente",
          cognome: "sconosciuto"
        }
      }

      this.form.patchValue({
        id: this.studente.id,
        nome: this.studente.nome,
        cognome: this.studente.cognome
      });

    }, 1);
  }

}
