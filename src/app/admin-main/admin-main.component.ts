import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EspecialidadesService } from '../especialidades.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PsicologosService } from '../psicologos.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  espForm: FormGroup
  adminRegForm: FormGroup

  constructor(private router: Router, private especialidadesService: EspecialidadesService, private psicologosService: PsicologosService) {
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
  }

  addEsp() {
    this.especialidadesService.createEsp(this.espForm.value).then(res => {
      console.log(res)
    })
    this.espForm.reset()
  }

  logOutAdmin() {
    this.router.navigate([''])
  }

  manejarRegistro() {
    this.psicologosService.doRegistroAdmin(this.adminRegForm.value).then((res) => {
      console.log(res)
      this.router.navigate(['/admin/inicio'])
    })
    this.adminRegForm.reset()
  }

}
