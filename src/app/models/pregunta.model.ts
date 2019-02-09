export class Pregunta {

  id: number;
  titulo: string;
  respuesta: number;

  constructor(pId: number, pTitulo: string, pRespuesta: number) {
    this.id = pId;
    this.titulo = pTitulo;
    this.respuesta = pRespuesta;
  }

}
