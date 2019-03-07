import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pregunta } from './models/pregunta.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/preguntas'
  }

  getAllPreguntas() {
    return this.httpClient.get<Pregunta[]>(this.url).toPromise();
  }
}
