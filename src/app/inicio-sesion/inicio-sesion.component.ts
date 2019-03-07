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
  login: boolean

  constructor(private router: Router, private psicologosService: PsicologosService) {
    this.login = false
  }

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
      // console.log(res)
      if(res.error){
        return this.login = true
      }else{
        this.login = false
        localStorage.setItem('token', res.token.toString())
        this.router.navigate([`/inicio/${res.numColeg}`])
      }
    })
    this.loginForm.reset()
  }

  irRegistro() {
    this.router.navigate(['/registro'])
  }

}
