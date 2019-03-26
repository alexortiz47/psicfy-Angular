import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-principal',
  templateUrl: './main-principal.component.html',
  styleUrls: ['./main-principal.component.css']
})
export class MainPrincipalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irEvaluate() {
    this.router.navigate(['evaluate'])
  }

  irCerca() {
    this.router.navigate(['buscar_localizacion'])
  }

  irQue() {
    this.router.navigate(['que_es'])
  }

  irCuando() {
    this.router.navigate(['cuando_ir'])
  }


}
