import { Component, OnInit } from '@angular/core';
import { PsicologosService } from '../psicologos.service';
import { Psicologo } from '../models/psicologo.model';
import { EspecialidadesService } from '../especialidades.service';
import { Especialidad } from '../models/especialidad.model';

@Component({
  selector: 'cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.css']
})
export class CercaComponent implements OnInit {

  arrPsico: Psicologo[]
  arrEsp: Especialidad[] // Para pintar el select de especialidades
  arrDatosPsico: any[]

  constructor(private psicologosService: PsicologosService, private especialidadesService: EspecialidadesService) {
    this.arrDatosPsico = []
    this.psicologosService.getAllPsicologos().then((res) => {
      // console.log(res)
      this.arrPsico = res;
      this.arrPsico.map(psico => {
        this.especialidadesService.getEspByPsicologo(psico.id).then(res => {
          // console.log(res)
          let datosPsico = {
            nombre: psico.nombre,
            apellidos: psico.apellidos,
            numColeg: psico.numColeg,
            especialidades: res,
            poblacion: psico.poblacion,
            domicilio: psico.domicilio,
            codPostal: psico.codPostal,
            correo: psico.correo
          }
          this.arrDatosPsico.push(datosPsico)
        })
      })
      console.log(this.arrDatosPsico)
    })
    this.especialidadesService.getAllEspecialidades().then(res => {
      this.arrEsp = res
    })
  }

  ngOnInit() {
  }

  seleccionarPob($event) {
    console.log($event.target.value);
  }

  seleccionarEsp($event) {
    console.log($event.target.value);
  }

}
