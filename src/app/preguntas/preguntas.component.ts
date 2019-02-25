import { Component, OnInit } from '@angular/core';
import { Pregunta } from '../models/pregunta.model';
import { PreguntasService } from '../preguntas.service';

@Component({
  selector: 'preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  arrPreguntas: Pregunta[]

  constructor(private preguntasService: PreguntasService) {
    this.preguntasService.getAllPreguntas().then((res) => {
      this.arrPreguntas = res;
    })
  }

  ngOnInit() {
  }

  enviarPreguntas() {
  }

}
