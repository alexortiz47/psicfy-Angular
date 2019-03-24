import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstilosService {

  activeLink: boolean

  constructor() {
    this.activeLink = false
  }
}
