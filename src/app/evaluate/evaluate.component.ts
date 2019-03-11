import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../preguntas.service';
import { Pregunta } from '../models/pregunta.model';
import { Router } from '@angular/router';

@Component({
  selector: 'evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {

  mensaje: boolean
  preguntas: boolean
  resultado: boolean
  arrPreguntas: Pregunta[]
  arrRespuestas: any[]
  edad: number

  constructor(private preguntasService: PreguntasService, private router: Router) {
    this.preguntasService.getAllPreguntas().then((res) => {
      this.arrPreguntas = res
    })
    this.mensaje = true
    this.preguntas = false
    this.resultado = false
    this.arrRespuestas = []
  }

  ngOnInit() {
  }

  iniciarPreguntas() {
    if(!this.preguntas || this.mensaje) {
      this.preguntas = true;
      this.mensaje = false;
    }
  }

  volverMensajeInicio(){
    if(this.preguntas || !this.mensaje) {
      this.preguntas = false;
      this.mensaje = true;
    }
  }

  respRecibida($event) {
    let elem = this.arrRespuestas.find((item) => {
      return item.preguntaId == $event.preguntaId
    })
    if(elem){
      elem.value = $event.value
    }else{
      this.arrRespuestas.push($event)
    }

  }

  enviarRespuestas() {
    console.log(this.edad)
    console.log(this.arrRespuestas)
    this.resultado = true
    this.preguntas = false
  }

  terminarEval() {
    this.router.navigate(['buscar'])
  }

}
