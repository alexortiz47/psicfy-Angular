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
  totalDepresion: number
  totalAnsiedad: number
  totalAdiccion: number
  totalEmocion: number
  depresion1: boolean
  depresion2: boolean
  ansiedad1: boolean
  ansiedad2: boolean
  adicciones1: boolean
  adicciones2: boolean
  emociones1: boolean
  emociones2: boolean

  constructor(private preguntasService: PreguntasService, private router: Router) {
    this.preguntasService.getAllPreguntas().then((res) => {
      this.arrPreguntas = res
    })
    this.mensaje = true
    this.preguntas = false
    this.resultado = false
    this.arrRespuestas = []
    this.totalDepresion = 0
    this.totalAnsiedad = 0
    this.totalAdiccion = 0
    this.totalEmocion = 0
    this.depresion1 = false
    this.depresion2 = false
    this.ansiedad1 = false
    this.ansiedad2 = false
    this.adicciones1 = false
    this.adicciones2 = false
    this.emociones1 = false
    this.emociones2 = false
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

    for(let i = 0; i <= 4; i++){
      this.totalDepresion += parseInt(this.arrRespuestas[i].value)
    }
    for(let i = 5; i <= 9; i++){
      this.totalAnsiedad += parseInt(this.arrRespuestas[i].value)
    }
    for(let i = 10; i <= 14; i++){
      this.totalAdiccion += parseInt(this.arrRespuestas[i].value)
    }
    for(let i = 15; i <= 19; i++){
      this.totalEmocion += parseInt(this.arrRespuestas[i].value)
    }
    console.log(`Depresion: ${this.totalDepresion}`)
    console.log(`Ansiedad: ${this.totalAnsiedad}`)
    console.log(`Adicciones: ${this.totalAdiccion}`)
    console.log(`Emociones: ${this.totalEmocion}`)

    if(this.totalDepresion > 13 && this.totalDepresion < 19) {
      this.depresion1 = true
    } else if (this.totalDepresion > 18) {
      this.depresion2 = true
    }

    if(this.totalAnsiedad > 13 && this.totalAnsiedad < 19) {
      this.ansiedad1 = true
    } else if (this.totalAnsiedad > 18) {
      this.ansiedad2 = true
    }

    if(this.totalAdiccion > 13 && this.totalAdiccion < 19) {
      this.adicciones1 = true
    } else if (this.totalAdiccion > 18) {
      this.adicciones2 = true
    }

    if(this.totalEmocion > 13 && this.totalEmocion < 19) {
      this.emociones1 = true
    } else if (this.totalEmocion > 18) {
      this.emociones2 = true
    }

    this.resultado = true
    this.preguntas = false
  }

  terminarEval() {
    this.router.navigate(['buscar'])
  }

}
