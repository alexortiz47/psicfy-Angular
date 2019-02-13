export class Psicologo {

  id: number;
  nombre: string;
  apellidos: string;
  numColeg: number;
  especialidad: string;
  imgUrl: string;
  correo: string;
  password: string;
  direccion: string;
  codPostal: number;
  latitud: number;
  longitud: number;

  constructor(pId: number, pNombre: string, pApellidos: string, pNumCol: number, pEspecialidad: string, pImgUrl: string, pCorreo: string, pPassword: string, pDireccion: string, pCodPostal: number, pLatitud: number, pLongitud: number) {
    this.id = pId;
    this.nombre = pNombre;
    this.apellidos = pApellidos;
    this.numColeg = pNumCol;
    this.especialidad = pEspecialidad
    this.imgUrl = pImgUrl;
    this.correo = pCorreo;
    this.password = pPassword;
    this.direccion = pDireccion;
    this.codPostal = pCodPostal;
    this.latitud = pLatitud;
    this.longitud = pLongitud;
  }

}
