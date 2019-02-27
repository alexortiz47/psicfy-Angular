import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminForm: FormGroup

  constructor(private router: Router) { }

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
    console.log(this.adminForm.value);
    this.router.navigate(['/admin/inicio'])
  }

}
