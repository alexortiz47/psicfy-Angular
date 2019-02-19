import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  loginForm: FormGroup

  constructor(private router: Router) { }

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
    console.log(this.loginForm.value);
    this.router.navigate([''])
  }

  irRegistro() {
    this.router.navigate(['/registro'])
  }

}
