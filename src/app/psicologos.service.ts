import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Psicologo } from './models/psicologo.model';

@Injectable({
  providedIn: 'root'
})
export class PsicologosService {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'https://proyecto-final-neoland-aob.firebaseio.com/psicologos.json';
  }

  getAllPsicologos() {
    return this.httpClient.get<Psicologo[]>(this.url).toPromise()
  }

}
