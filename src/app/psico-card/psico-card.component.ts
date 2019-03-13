import { Component, OnInit, Input } from '@angular/core';
import { Psicologo } from '../models/psicologo.model';

@Component({
  selector: 'psico-card',
  templateUrl: './psico-card.component.html',
  styleUrls: ['./psico-card.component.css']
})
export class PsicoCardComponent implements OnInit {

  @Input() psico: Psicologo
  @Input() duracion: string
  @Input() distancia: string

  constructor() { }

  ngOnInit() {
  }

}
