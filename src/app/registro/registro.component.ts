import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup

  constructor() { }

  ngOnInit() {
    this.registroForm = new FormGroup({
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      numColeg: new FormControl(''),
      domicilio: new FormControl(''),
      codPostal: new FormControl(''),
      especialidad: new FormControl('')
    })
  }

  manejarRegistro() {
    console.log(this.registroForm.value)
  }

}
