import { Component, OnInit } from '@angular/core';
import { PsicologosService } from '../psicologos.service';
import { Psicologo } from '../models/psicologo.model';

@Component({
  selector: 'cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.css']
})
export class CercaComponent implements OnInit {

  arrPsico: Psicologo[]

  constructor(private psicologosService: PsicologosService) {
    this.psicologosService.getAllPsicologos().then((res) => {
      console.log(res)
      this.arrPsico = res;
    })

  }

  ngOnInit() {
  }

}
