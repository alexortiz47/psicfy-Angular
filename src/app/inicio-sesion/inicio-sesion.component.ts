import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PsicologosService } from '../psicologos.service';

@Component({
  selector: 'inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  loginForm: FormGroup

  constructor(private router: Router, private psicologosService: PsicologosService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      correo: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  manejarLogin() {
    this.psicologosService.doLogin(this.loginForm.value).then((res) => {
      console.log(res)
    })
    console.log(this.loginForm.value);
  }

  irRegistro() {
    this.router.navigate(['/registro'])
  }

}
