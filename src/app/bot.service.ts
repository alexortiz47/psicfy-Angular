import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  url: string;

  constructor(private httpClient: HttpClient) {
    // this.url = 'http://localhost:3000/bot'
    this.url = 'https://back.psicfy.com/bot';
  }

  sendMensaje(mensaje) {
    return this.httpClient.post(this.url, { mensaje: mensaje } ).toPromise();
  }
}
