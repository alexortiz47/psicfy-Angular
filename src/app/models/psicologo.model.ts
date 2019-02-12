export class Psicologo {

  id: number;
  nombre: string;
  apellidos: string;
  numColeg: number;
  especialidad: string;
  imgUrl: string;

  constructor(pId: number, pNombre: string, pApellidos: string, pNumCol: number, pEspecialidad: string, pImgUrl: string) {
    this.id = pId;
    this.nombre = pNombre;
    this.apellidos = pApellidos;
    this.numColeg = pNumCol;
    this.especialidad = pEspecialidad
    this.imgUrl = pImgUrl;
  }

}
