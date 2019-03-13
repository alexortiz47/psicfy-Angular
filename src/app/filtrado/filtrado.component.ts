import { Component, OnInit, SimpleChange } from '@angular/core';
import { Psicologo } from '../models/psicologo.model';
import { Especialidad } from '../models/especialidad.model';
import { PsicologosService } from '../psicologos.service';
import { EspecialidadesService } from '../especialidades.service';

@Component({
  selector: 'app-filtrado',
  templateUrl: './filtrado.component.html',
  styleUrls: ['./filtrado.component.css']
})
export class FiltradoComponent implements OnInit {

  arrPsico: Psicologo[];
  arrEsp: Especialidad[]; // Para pintar el select de especialidades
  arrDatosPsico: any[];
  arrFiltrado: any[];
  poblacion: string;
  especialidad: string;
  nombre: string

  constructor(private psicologosService: PsicologosService, private especialidadesService: EspecialidadesService) {
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
            latitud: psico.latitud,
            longitud: psico.longitud,
            correo: psico.correo,
            imgUrl: psico.imgUrl
          };
          this.arrDatosPsico.push(datosPsico);
        });
      });
      this.arrFiltrado = this.arrDatosPsico
    });
    this.especialidadesService.getAllEspecialidades().then(res => {
      this.arrEsp = res;
    });
    this.poblacion = "Todos"
    this.especialidad = "Todas"
    this.arrFiltrado = this.arrDatosPsico
    this.nombre = ''
  }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChange) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: ValorActual = ${cur}, ValorPrevio = ${prev}`);
    }
  }

  sendName($event) {
    if($event.keyCode == 13) {
      this.arrFiltrado = this.arrFiltrado.filter(item => {
        if(item.nombre.includes(this.nombre)){
          return true
        }else{
          return false
        }
      })
      if(this.nombre == ''){
        this.arrFiltrado = this.arrDatosPsico
      }
    }
  }



  seleccion($event) {
    // console.log(this.poblacion);
    // console.log(this.especialidad);

    this.arrFiltrado = [...this.arrDatosPsico]; // Cada vez que se hace change de alguno de los select, genera un nuevo array, y sobre ese evalua, si el de la poblacion es 'todos' no entra en el primer if, al igual que si el de las especialidades es 'todas'

    if (this.poblacion != "Todos") {
      this.arrFiltrado = this.arrFiltrado.filter(psico => {
        return psico.poblacion.split(", ").includes(this.poblacion);
      });
    }

    if (this.especialidad != "Todas") {
      this.arrFiltrado = this.arrFiltrado.filter(psico => {
        return psico.especialidades.map(item => item.nombre).includes(this.especialidad);
      });
    }
  }

}
