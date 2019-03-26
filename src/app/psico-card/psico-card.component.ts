import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'psico-card',
  templateUrl: './psico-card.component.html',
  styleUrls: ['./psico-card.component.css']
})
export class PsicoCardComponent implements OnInit {

  @Input() psico: any
  @Input() duracion: string
  @Input() distancia: string

  constructor() { }

  ngOnInit() {
  }

}
