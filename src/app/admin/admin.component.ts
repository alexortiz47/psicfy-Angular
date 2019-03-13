import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PsicologosService } from '../psicologos.service';
import { EspecialidadesService } from '../especialidades.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminForm: FormGroup
  espForm: FormGroup
  adminRegForm: FormGroup
  login: boolean
  loginOk: boolean

  constructor(private router: Router, private psicologosService: PsicologosService, private especialidadesService: EspecialidadesService) {
    this.login = false
    this.loginOk = false
    this.espForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ])
    })
    this.adminRegForm = new FormGroup({
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
      ])
    })
  }

  ngOnInit() {
    this.adminForm = new FormGroup({
      correo: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  // Enviar los datos para comprobar login para el Administrador
  manejarLogin() {
    this.psicologosService.doLoginAdmin(this.adminForm.value).then((res) => {
      console.log(res)
      if(res.error){
        return this.login = true
      }else{
        this.login = false
        this.loginOk = true
      }
    })
    this.adminForm.reset()
  }

  // Añadir una especialidad en la base de datos
  addEsp() {
    this.especialidadesService.createEsp(this.espForm.value).then(res => {
      console.log(res)
    })
    this.espForm.reset()
  }

  // Añadir un nuevo administrador a la base de datos
  manejarRegistro() {
    this.psicologosService.doRegistroAdmin(this.adminRegForm.value).then((res) => {
      console.log(res)
    })
    this.adminRegForm.reset()
  }

  // Salir del login del Administrador
  logOutAdmin() {
    localStorage.removeItem('token')
    this.router.navigate([''])
  }

}
