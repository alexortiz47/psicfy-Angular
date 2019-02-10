import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cabecera',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  irEvaluate() {
    this.router.navigate(['evaluate'])
  }

  irCerca() {
    this.router.navigate(['cerca'])
  }

  irRegistro() {
    this.router.navigate(['registro'])
  }

  irLogin() {
    this.router.navigate(['login'])
  }

}

