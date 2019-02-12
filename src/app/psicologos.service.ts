import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PsicologosService {

  constructor(private httpClient: HttpClient) {

  }

  getAllPsicologos() {
    let url = 'https://proyecto-final-neoland-aob.firebaseio.com/psicologos/psicologos.json';
    return this.httpClient.get(url).toPromise()
  }
}
