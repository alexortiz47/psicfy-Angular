import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Psicologo } from './models/psicologo.model';

@Injectable({
  providedIn: 'root'
})
export class PsicologosService {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/psicologos';
  }

  doRegistro(value) {
    let datosRegistro = {
      nombre: value.nombre,
      apellidos: value.apellidos,
      numColeg: value.numColeg,
      domicilio: value.domicilio,
      codPostal: value.codPostal,
      especialidades: value.especialidades,
      poblacion: value.poblacion,
      correo: value.correo,
      password: value.password,
      imgUrl: value.imgUrl,
      latitud: value.latitud,
      longitud: value.longitud
    }
    return this.httpClient.post<Psicologo[]>(`${this.url}/create`, datosRegistro).toPromise()
  }

  doLogin(values){
    return this.httpClient.post<any>(`${this.url}/checklogin`, values).toPromise()
  }

  getAllPsicologos() {
    return this.httpClient.get<Psicologo[]>(this.url).toPromise()
  }

  comprobarToken() {
    if(localStorage.getItem('token')){
      return true
    }else{
      return false
    }
  }

  getByToken(token) {
    return this.httpClient.post<Psicologo>(`${this.url}/token`, {token: token}).toPromise()
  }

}
