export class Psicologo {

  id: number;
  nombre: string;
  apellidos: string;
  numCol: number;

  constructor(pId: number, pNombre: string, pApellidos: string, pNumCol: number) {
    this.id = pId;
    this.nombre = pNombre;
    this.apellidos = pApellidos;
    this.numCol = pNumCol;
  }

}
