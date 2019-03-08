import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PsicologosService } from '../psicologos.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminForm: FormGroup
  login: boolean

  constructor(private router: Router, private psicologosService: PsicologosService) {
    this.login = false
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

  manejarLogin() {
    this.psicologosService.doLoginAdmin(this.adminForm.value).then((res) => {
      console.log(res)
      if(res.error){
        return this.login = true
      }else{
        this.login = false
        this.router.navigate(['/admin/inicio'])
      }
    })
    this.adminForm.reset()
  }
}
