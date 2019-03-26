import { Component, OnInit, SimpleChange } from '@angular/core';
import { Psicologo } from '../models/psicologo.model';
import { Especialidad } from '../models/especialidad.model';
import { PsicologosService } from '../psicologos.service';
import { EspecialidadesService } from '../especialidades.service';
import { Router } from '@angular/router';

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

  constructor(private psicologosService: PsicologosService, private especialidadesService: EspecialidadesService, private router: Router) {
    this.arrDatosPsico = [];
    this.psicologosService.getAllPsicologos().then(res => {
      // console.log(res)
      this.arrPsico = res;
      this.arrPsico.map(psico => {
        this.especialidadesService.getEspByPsicologo(psico.id).then(res => {
          // console.log(res)
          let datosPsico = {
            id: psico.id,
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

  ngOnInit() { }

  // Método que al dar al enter, busca el nombre introducido en el input o si lo contiene
  sendName($event) {
    if($event.keyCode == 13) {
      this.arrFiltrado = this.arrFiltrado.filter(item => {
        if(item.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))){
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

  // Método que filtra según lo que se elija en los selects
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

  irPsicologo(id) {
    this.router.navigate([`/psico/${id}`])
  }

}
