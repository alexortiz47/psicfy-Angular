import { Component, OnInit } from '@angular/core';
import { PsicologosService } from '../psicologos.service';
import { Psicologo } from '../models/psicologo.model';
import { EspecialidadesService } from '../especialidades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidad } from '../models/especialidad.model';

@Component({
  selector: 'app-infopsico',
  templateUrl: './infopsico.component.html',
  styleUrls: ['./infopsico.component.css']
})
export class InfopsicoComponent implements OnInit {

  psicologo: Psicologo
  especialidades: Especialidad[]

  constructor(private psicologosService: PsicologosService, private especialidadesService: EspecialidadesService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.psicologosService.getById(params.id).then(res => {
        // console.log(res)
        this.psicologo = res
      })
      this.especialidadesService.getEspByPsicologo(params.id).then(res => {
        this.especialidades = res
      })
    })

  }

  ngOnInit() {
  }

  volverFiltrado() {
    this.router.navigate(['buscar_filtrado'])
  }

}
