import { Component, OnInit } from '@angular/core';
import { PsicologosService } from '../psicologos.service';
import { Psicologo } from '../models/psicologo.model';

@Component({
  selector: 'cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.css']
})
export class CercaComponent implements OnInit {

  arrPsico: Psicologo[]

  arrEspecialidades: string[];
  arrPoblaciones: string[];

  constructor(private psicologosService: PsicologosService) {
    this.psicologosService.getAllPsicologos().then((res) => {
      console.log(res)
      this.arrPsico = res;
    })
    this.arrEspecialidades = ['Ansiedad', 'Depresión', 'Trastornos del sueño', 'Trastornos alimenticios', 'Pareja y sexualidad', 'Familia', 'Consumo de tóxicos', 'Adicciones', 'Duelo', 'Trastorno por estrés postraumático', 'Violencia de género', 'Discapacidad', 'Trastorno mental grave', 'Coaching'];
    this.arrPoblaciones = ['Infanto-Juvenil', 'Adultos'];

  }

  ngOnInit() {
  }

}
