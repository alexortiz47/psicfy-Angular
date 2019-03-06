export class Psicologo {

  id: number;
  nombre: string;
  apellidos: string;
  numColeg: number;
  especialidad: string;
  poblacion: string;
  imgUrl: string;
  correo: string;
  password: string;
  domicilio: string;
  codPostal: number;
  latitud: number;
  longitud: number;
  token: string;

  constructor(pId: number, pNombre: string, pApellidos: string, pNumCol: number, pEspecialidad: string, pPoblacion: string, pImgUrl: string, pCorreo: string, pPassword: string, pDomicilio: string, pCodPostal: number, pLatitud: number, pLongitud: number, pToken: string) {
    this.id = pId;
    this.nombre = pNombre;
    this.apellidos = pApellidos;
    this.numColeg = pNumCol;
    this.especialidad = pEspecialidad;
    this.poblacion = pPoblacion;
    this.imgUrl = pImgUrl;
    this.correo = pCorreo;
    this.password = pPassword;
    this.domicilio = pDomicilio;
    this.codPostal = pCodPostal;
    this.latitud = pLatitud;
    this.longitud = pLongitud;
    this.token = pToken
  }

}
