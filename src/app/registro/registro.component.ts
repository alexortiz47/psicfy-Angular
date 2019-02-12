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
      correo_repeat: new FormControl(''),
      password: new FormControl('', [
        Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
      ]),
      password_repeat: new FormControl('')
    }, [
      this.repeatPasswordValidator,
      this.repeatCorreoValidator
    ])
  }

  repeatCorreoValidator(group: FormGroup) {
    let correo = group.controls['correo'].value
    let correo_repeat = group.controls['correo_repeat'].value

    return (correo == correo_repeat) ? null : { 'correo_repeat': 'El correo no coincide' }
  }

  repeatPasswordValidator(group: FormGroup) {
    let password = group.controls['password'].value
    let password_repeat = group.controls['password_repeat'].value

    return (password == password_repeat) ? null : { 'password_repeat': 'La contraseña no coincide' }
  }

  manejarRegistro() {
    console.log(this.registroForm.value)
  }

  irInicio(){
    this.router.navigate(['/login'])
  }

}
