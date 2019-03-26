import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PsicologosService } from '../psicologos.service';
import { Psicologo } from '../models/psicologo.model';
import { EstilosService } from '../estilos.service';

@Component({
  selector: 'cabecera',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token: string
  psicologoLogeado: Psicologo

  constructor(private router: Router, public psicologosService: PsicologosService, public estilosService: EstilosService) {
    this.token = localStorage.getItem('token')
    this.psicologosService.getByToken(this.token).then(res => {
      // console.log(res)
      this.psicologoLogeado = res
    })
  }

  ngOnInit() {
    if(this.router.url != "/buscar_localizacion" && this.router.url != "/buscar_filtrado") {
        this.estilosService.activeLink = false
      }
  }

  irInicio(){
    localStorage.getItem('token') ? this.router.navigate([`inicio/${this.psicologoLogeado.numColeg}`]) : this.router.navigate([''])
  }

  irLocal() {
    this.estilosService.activeLink = true
    this.router.navigate(['buscar_localizacion'])
  }

  irFiltrado() {
    this.estilosService.activeLink = true
    this.router.navigate(['buscar_filtrado'])
  }

  irLogeado() {
    this.router.navigate([`edit/${this.psicologoLogeado.numColeg}`])
  }

  logOut() {
    localStorage.removeItem('token')

    this.router.navigate(['inicio'])
  }

}

