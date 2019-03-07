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
  arrEsp: Especialidad[]

  constructor(private psicologosService: PsicologosService, private especialidadesService: EspecialidadesService) {
    this.psicologosService.getAllPsicologos().then((res) => {
      this.arrPsico = res;
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
