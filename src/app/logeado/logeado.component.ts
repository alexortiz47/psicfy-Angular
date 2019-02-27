import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logeado',
  templateUrl: './logeado.component.html',
  styleUrls: ['./logeado.component.css']
})
export class LogeadoComponent implements OnInit {

  especialidades: boolean;
  poblacion: boolean;

  perfilForm: FormGroup;

  arrEspecialidades: string[];
  arrPoblaciones: string[];

  constructor(private router: Router) {
    this.arrEspecialidades = ['Ansiedad', 'Depresión', 'Trastornos del sueño', 'Trastornos alimenticios', 'Pareja y sexualidad', 'Familia', 'Consumo de tóxicos', 'Adicciones', 'Duelo', 'Trastorno por estrés postraumático', 'Violencia de género', 'Discapacidad', 'Trastorno mental grave', 'Coaching'];
    this.arrPoblaciones = ['Infanto-Juvenil (0-16 años)', 'Adultos (>16 años)'];
    this.especialidades = false;
    this.poblacion = false;
  }

  ngOnInit() {
    this.perfilForm = new FormGroup({
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
      domicilio: new FormControl('Plaza de España, 11', [
        Validators.required
      ]),
      codPostal: new FormControl('28008', [
        Validators.required,
        Validators.pattern(/^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/)
      ]),
      latitud: new FormControl(''),
      longitud: new FormControl(''),
      especialidades: this.buildEspecialidades(),
      poblacion: this.buildPoblaciones(),
      correo: new FormControl('alex@gmail.com', [
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

  // Validaciones:
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

  // Checkboxes de Especialidades y población:
  buildEspecialidades() {
    const values = this.arrEspecialidades.map(item => new FormControl(false))
    return new FormArray(values)
  }

  buildPoblaciones() {
    const values = this.arrPoblaciones.map(item => new FormControl(false))
    return new FormArray(values)
  }

  // Evento ngSubmit del formulario de Angular
  manejarPerfil() {

    let valueSubmit = Object.assign({}, this.perfilForm.value)

    valueSubmit = Object.assign(valueSubmit, {
      especialidades: valueSubmit.especialidades.map((v, i) => v ? this.arrEspecialidades[i].toLowerCase().replace(/ /g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, "") : null).filter(v => v !== null),
      poblacion: valueSubmit.poblacion.map((v, i) => v ? this.arrPoblaciones[i].toLowerCase().replace(' ', '_').normalize('NFD').replace(/[\u0300-\u036f]/g, "") : null).filter(v => v !== null)
    })
    console.log(valueSubmit)

  }

  // Mostrar u ocultar las especialidades y poblacion para cambiarlo
  cambiarEsp() {
    if(!this.especialidades){
      this.especialidades = true;
    }else{
      this.especialidades = false;
    }
  }

  cambiarPob() {
    if(!this.poblacion){
      this.poblacion = true;
    }else{
      this.poblacion = false;
    }
  }

}
