import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  terminarEval() {
    this.router.navigate(['buscar'])
  }

}
