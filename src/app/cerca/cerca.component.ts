import { Component, OnInit } from "@angular/core";
import { PsicologosService } from "../psicologos.service";
import { Psicologo } from "../models/psicologo.model";
import { EspecialidadesService } from "../especialidades.service";
import { Especialidad } from "../models/especialidad.model";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: "cerca",
  templateUrl: "./cerca.component.html",
  styleUrls: ["./cerca.component.css"]
})
export class CercaComponent implements OnInit {
  arrPsico: Psicologo[];
  arrEsp: Especialidad[]; // Para pintar el select de especialidades
  arrDatosPsico: any[];
  arrFiltrado: any[];
  poblacion: string;
  especialidad: string;

  constructor(
    private psicologosService: PsicologosService,
    private especialidadesService: EspecialidadesService
  ) {
    this.arrDatosPsico = [];

    this.psicologosService.getAllPsicologos().then(res => {
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
          };
          this.arrDatosPsico.push(datosPsico);
        });
      });
      this.arrFiltrado = this.arrDatosPsico
    });
    this.especialidadesService.getAllEspecialidades().then(res => {
      this.arrEsp = res;
    });
    this.poblacion = "Todos";
    this.especialidad = "Todas";
    this.arrFiltrado = this.arrDatosPsico;
  }

  ngOnInit() {}

  seleccion($event) {
    // console.log(this.poblacion);
    // console.log(this.especialidad);

    this.arrFiltrado = [...this.arrDatosPsico]; // Cada vez que se hace change de alguno de los select, genera un nuevo array, y sobre ese evalua, si el de la poblacion es 'todos' no entra en el primer if, al igual que si el de las especialidades es 'todas'

    if (this.poblacion != "Todos") {
      this.arrFiltrado = this.arrFiltrado.filter(psico => {
        return psico.poblacion.split(",").includes(this.poblacion);
      });
    }

    if (this.especialidad != "Todas") {
      this.arrFiltrado = this.arrFiltrado.filter(psico => {
        return psico.especialidades.map(item => item.nombre).includes(this.especialidad);
      });
    }
  }
}
