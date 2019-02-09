import { Component } from '@angular/core';
import { PsicologosService } from './psicologos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private psicologosService: PsicologosService) {
    this.psicologosService.getAllPsicologos().then((res) => console.log(res))
  }

  ngOnInit() {

  }
}
