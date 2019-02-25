import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {

  mensaje: boolean;
  inicio: boolean;

  constructor() {
    this.mensaje = true;
    this.inicio = false;
  }

  ngOnInit() {
  }

  iniciarPreguntas() {
    if(!this.inicio || this.mensaje) {
      this.inicio = true;
      this.mensaje = false;
    }
  }

  volverMensajeInicio(){
    if(this.inicio || !this.mensaje) {
      this.inicio = false;
      this.mensaje = true;
    }
  }

}
