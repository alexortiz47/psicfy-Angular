import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { PsicologosService } from '../psicologos.service';
import { EspecialidadesService } from '../especialidades.service';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  arrEspecialidades: string[];
  arrPoblaciones: string[];
  arrIdEsp: number[]

  constructor(private router: Router, private psicologosService: PsicologosService, private especialidadesService: EspecialidadesService) {
    this.arrEspecialidades = [];
    this.arrPoblaciones = ['Infanto-Juvenil (0-16)', 'Adultos (>16)'];
    this.arrIdEsp = []
  }

  ngOnInit() {
    this.especialidadesService.getAllEspecialidades().then((res) => {
      // console.log(res)
      res.forEach(item => {
        this.arrEspecialidades.push(item.nombre)
        this.arrIdEsp.push(item.id)
      })
      // Creamos el formulario aqui porque es donde ya hemos recogido las especialidades de la BD
      this.registroForm = new FormGroup({
        nombre: new FormControl('', [
          Validators.required
        ]),
        apellidos: new FormControl('', [
          Validators.required
        ]),
        numColeg: new FormControl('', [
          Validators.required,
          Validators.pattern(/^([0-9]{3,5})[M]$/)
        ]),
        domicilio: new FormControl('', [
          Validators.required
        ]),
        codPostal: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/)
        ]),
        latitud: new FormControl(''),
        longitud: new FormControl(''),
        especialidades: this.buildEspecialidades(),
        poblacion: this.buildPoblaciones(),
        correo: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        ]),
        correo_repeat: new FormControl(''),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
        ]),
        password_repeat: new FormControl(''),
        imgUrl: new FormControl('')
      }, [
        this.repeatPasswordValidator,
        this.repeatCorreoValidator
      ])
    })
  }

  buildEspecialidades() {
    const values = this.arrEspecialidades.map(item => new FormControl(false))
    return new FormArray(values)
  }

  buildPoblaciones() {
    const values = this.arrPoblaciones.map(item => new FormControl(false))
    return new FormArray(values)
  }

  manejarRegistro() {

    let valueSubmit = Object.assign({}, this.registroForm.value)

    valueSubmit = Object.assign(valueSubmit, {
      especialidades: valueSubmit.especialidades.map((v, i) => v ? this.arrIdEsp[i] : null).filter(v => v !== null),
      poblacion: valueSubmit.poblacion.map((v, i) => v ? this.arrPoblaciones[i].normalize('NFD') : null).filter(v => v !== null).join(', ')
    })
    this.psicologosService.doRegistro(valueSubmit).then((res) => {
      console.log(res)
      this.router.navigate([`/login`])
    })
    // console.log(valueSubmit)
    this.registroForm.reset()
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

  irLogin(){
    this.router.navigate(['/login'])
  }

}
