import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup

  constructor(private router: Router) { }

  ngOnInit() {
    this.registroForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      apellidos: new FormControl('', [
        Validators.required
      ]),
      numColeg: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9]{3,7})$/)
      ]),
      domicilio: new FormControl('', [
        Validators.required
      ]),
      codPostal: new FormControl('', [
        Validators.required
      ]),
      especialidad: new FormControl(''),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl('', [
        Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
      ])
    })
  }

  manejarRegistro() {
    console.log(this.registroForm.value)
  }

  irInicio(){
    this.router.navigate(['/login'])
  }

}
