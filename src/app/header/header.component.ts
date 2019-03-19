import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PsicologosService } from '../psicologos.service';
import { Psicologo } from '../models/psicologo.model';

@Component({
  selector: 'cabecera',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token: string
  psicologoLogeado: Psicologo

  constructor(private router: Router, public psicologosService: PsicologosService) {
    this.token = localStorage.getItem('token')
    this.psicologosService.getByToken(this.token).then(res => {
      // console.log(res)
      this.psicologoLogeado = res
    })
  }

  ngOnInit() {
  }

  irInicio(){
    localStorage.getItem('token') ? this.router.navigate([`inicio/${this.psicologoLogeado.numColeg}`]) : this.router.navigate([''])
  }

  irEvaluate() {
    this.router.navigate(['evaluate'])
  }

  irCerca() {
    this.router.navigate(['buscar_localizacion'])
  }

  irFiltrado() {
    this.router.navigate(['buscar_filtrado'])
  }

  irContacto() {
    this.router.navigate(['contacto'])
  }

  irRegistro() {
    this.router.navigate(['registro'])
  }

  irLogin() {
    this.router.navigate(['login'])
  }

  irLogeado() {
    this.router.navigate([`edit/${this.psicologoLogeado.numColeg}`])
  }

  logOut() {
    localStorage.removeItem('token')

    this.router.navigate(['inicio'])
  }

}

