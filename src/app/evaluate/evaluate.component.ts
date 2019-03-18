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
  boton: boolean
  noHelp: boolean
  // Variables para puntuacion de cada bloque
  totalDepresion: number
  totalAnsiedad: number
  totalAdiccion: number
  totalEmocion: number
  // Variables para mostrar un mensaje u otro. Dos por bloque (14-18 / 19-25)
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
    // Variables iniciadas para puntuacion de cada bloque
    this.totalDepresion = 0
    this.totalAnsiedad = 0
    this.totalAdiccion = 0
    this.totalEmocion = 0
    // Variables iniciadas para mostrar un mensaje u otro. Dos por bloque (14-18 / 19-25)
    this.depresion1 = false
    this.depresion2 = false
    this.ansiedad1 = false
    this.ansiedad2 = false
    this.adicciones1 = false
    this.adicciones2 = false
    this.emociones1 = false
    this.emociones2 = false
    this.boton = true
    this.noHelp = false
  }

  ngOnInit() {
  }

  // Metodo que da paso a empezar el cuestionario
  iniciarPreguntas() {
    if(!this.preguntas || this.mensaje) {
      this.preguntas = true;
      this.mensaje = false;
    }
  }

  // Método que vuelve desde las preguntas al mensaje de inicio
  volverMensajeInicio(){
    if(this.preguntas || !this.mensaje) {
      this.preguntas = false;
      this.mensaje = true;
    }
  }

  // Va sumando a un array, y comprobando si se cambian las respuestas de las preguntas, por si el usuario rectifica en alguna
  respRecibida($event) {
    // Buscamos en el array de respuestas si ya existe una pregunta contestada, y luego evaluamos que si existe, sustituya el valor por el nuevo, y sino que lo añada al arrat de respuestas
    let elem = this.arrRespuestas.find((item) => {
      return item.preguntaId == $event.preguntaId
    })
    if(elem){
      elem.value = $event.value
    }else{
      this.arrRespuestas.push($event)
    }
    this.arrRespuestas.length < 20 ? this.boton = true : this.boton = false
  }

  // Método que al pulsar el boton enviar, evalua las respuestas y saca uno u otro mensaje
  enviarRespuestas() {
    // console.log(this.edad)
    // console.log(this.arrRespuestas)

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
    // console.log(`Depresion: ${this.totalDepresion}`)
    // console.log(`Ansiedad: ${this.totalAnsiedad}`)
    // console.log(`Adicciones: ${this.totalAdiccion}`)
    // console.log(`Emociones: ${this.totalEmocion}`)

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

    if(this.totalDepresion < 14 && this.totalAnsiedad < 14 && this.totalAdiccion < 14 && this.totalEmocion < 14) {
      this.noHelp = true
    }

    this.resultado = true
    this.preguntas = false
  }

  irLocalizacion() {
    this.router.navigate(['buscar_localizacion'])
  }

  irFiltrado() {
    this.router.navigate(['buscar_filtrado'])
  }

  volverInicio() {
    this.router.navigate([''])
  }

}
