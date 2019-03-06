import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PsicologosService } from '../psicologos.service';

@Component({
  selector: 'cabecera',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public psicologosService: PsicologosService) {
  }

  ngOnInit() {
  }

  irEvaluate() {
    this.router.navigate(['evaluate'])
  }

  irBuscar() {
    this.router.navigate(['buscar'])
  }

  irRegistro() {
    this.router.navigate(['registro'])
  }

  irLogin() {
    this.router.navigate(['login'])
  }

  irLogeado() {
    this.router.navigate(['inicioLog'])
  }

  logOut() {
    localStorage.removeItem('token')

    this.router.navigate(['inicio'])
  }

}

