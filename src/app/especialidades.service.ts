import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from './models/especialidad.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/especialidades'
  }

  getAllEspecialidades() {
    return this.httpClient.get<Especialidad[]>(this.url).toPromise()
  }

  getEspByPsicologo(id) {
    return this.httpClient.post<any[]>(`${this.url}/psicol`, {id: id}).toPromise()
  }
}
