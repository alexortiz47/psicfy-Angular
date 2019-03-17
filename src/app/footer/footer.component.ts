import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'piepag',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irEvaluate() {
    this.router.navigate(['evaluate'])
  }

  irBuscar() {
    this.router.navigate(['buscar_localizacion'])
  }

  irFiltrar() {
    this.router.navigate(['buscar_filtrado'])
  }

  irInicio()  {
    this.router.navigate([''])
  }

}
