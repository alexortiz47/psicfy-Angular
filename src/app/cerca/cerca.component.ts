import { Component, OnInit } from '@angular/core';
import { PsicologosService } from '../psicologos.service';

@Component({
  selector: 'cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.css']
})
export class CercaComponent implements OnInit {

  constructor(private psicologosService: PsicologosService) {
    this.psicologosService.getAllPsicologos().then((res) => console.log(res))
  }

  ngOnInit() {
  }

}
