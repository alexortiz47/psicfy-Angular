import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactoService } from '../contacto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  formRegistro: FormGroup

  mensajeError: string

  constructor(private contactoService: ContactoService, private router: Router) { }

  ngOnInit() {
    this.formRegistro = new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
      ]),
      asunto: new FormControl('', [
        Validators.required,
        Validators.maxLength(250)
      ]),
  })
}

  enviarContacto(){

    this.contactoService.enviarContacto(this.formRegistro.value).then((res) => {
      this.mensajeError = res
      alert(this.mensajeError)
      this.router.navigate([''])
    })
  }
}
