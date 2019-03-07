import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray, FormControlName } from "@angular/forms";
import { Router } from "@angular/router";
import { PsicologosService } from "../psicologos.service";
import { Psicologo } from "../models/psicologo.model";
import { EspecialidadesService } from "../especialidades.service";

@Component({
  selector: "app-logeado",
  templateUrl: "./logeado.component.html",
  styleUrls: ["./logeado.component.css"]
})
export class LogeadoComponent implements OnInit {
  especialidades: boolean;
  poblacion: boolean;

  perfilForm: FormGroup;

  arrEspecialidades: string[];
  arrPoblaciones: string[];
  arrIdEsp: number[];
  arrEspPsicologo: any[];

  token: string;
  psicologoLogeado: Psicologo;

  constructor(private router: Router, public psicologosService: PsicologosService, private especialidadesService: EspecialidadesService) {
    this.arrEspecialidades = [];
    this.arrPoblaciones = ["Infanto-Juvenil (0-16)", "Adultos (>16)"];
    this.especialidades = false;
    this.arrIdEsp = [];
    this.poblacion = false;
    this.token = localStorage.getItem("token"); // Guardamos el token que esta en localstorage
    this.arrEspPsicologo = [];
    this.psicologosService.getByToken(this.token).then(res => {
      // console.log(res)
      this.psicologoLogeado = res
      this.createForm()
    })
  }

  ngOnInit(){

  }

  createForm() {
    this.especialidadesService.getAllEspecialidades().then(res => {
      // console.log(res)
      res.forEach(item => {
        this.arrEspecialidades.push(item.nombre);
        this.arrIdEsp.push(item.id);
      });
      this.perfilForm = new FormGroup({
          nombre: new FormControl("", [Validators.required]),
          apellidos: new FormControl("", [Validators.required]),
          numColeg: new FormControl("", [
            Validators.required,
            Validators.pattern(/^([0-9]{3,5})[M]$/)
          ]),
          domicilio: new FormControl(this.psicologoLogeado.domicilio, [
            Validators.required
          ]),
          codPostal: new FormControl(this.psicologoLogeado.codPostal, [
            Validators.required,
            Validators.pattern(/^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/)
          ]),
          latitud: new FormControl(this.psicologoLogeado.latitud),
          longitud: new FormControl(this.psicologoLogeado.longitud),
          especialidades: this.buildEspecialidades(),
          poblacion: this.buildPoblaciones(),
          correo: new FormControl(this.psicologoLogeado.correo, [
            Validators.required,
            Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
          ]),
          correo_repeat: new FormControl(""),
          imgUrl: new FormControl("")
        },
        [this.repeatCorreoValidator]
      );

      this.especialidadesService
        .getEspByPsicologo(this.psicologoLogeado.id).then(res => {
          // console.log(res)
          this.arrEspPsicologo = res; // Igualamos el array de objetos que nos llega con el array de las especialidades que hemos creado
        });
    });
  }

  // Validaciones:
  repeatCorreoValidator(group: FormGroup) {
    let correo = group.controls["correo"].value;
    let correo_repeat = group.controls["correo_repeat"].value;

    return correo == correo_repeat
      ? null
      : { correo_repeat: "El correo no coincide" };
  }

  // Checkboxes de Especialidades y población:
  buildEspecialidades() {
    const values = this.arrEspecialidades.map(item => new FormControl(false));
    return new FormArray(values);
  }

  buildPoblaciones() {
    const values = this.arrPoblaciones.map(item => new FormControl(false));
    return new FormArray(values);
  }

  // Evento ngSubmit del formulario de Angular
  manejarPerfil() {
    let valueSubmit = Object.assign({}, this.perfilForm.value);

    valueSubmit = Object.assign(valueSubmit, {
      especialidades: valueSubmit.especialidades
        .map((v, i) => (v ? this.arrIdEsp[i] : null))
        .filter(v => v !== null),
      poblacion: valueSubmit.poblacion
        .map((v, i) => (v ? this.arrPoblaciones[i].normalize("NFD") : null))
        .filter(v => v !== null)
        .join(", ")
    });

    let valuesUpdate = {
      token: this.token,
      id: this.psicologoLogeado.id
    }; // Creamos un objeto que tendra tantas claves como datos modificados

    if (this.perfilForm.controls.domicilio.dirty) {
      valuesUpdate['domicilio'] = valueSubmit.domicilio
    }

    if (this.perfilForm.controls.codPostal.dirty) {
      valuesUpdate['codPostal'] = valueSubmit.codPostal
    }

    if (valueSubmit.especialidades.length != 0) {
      valuesUpdate['especialidades'] = valueSubmit.especialidades
    }

    if(valueSubmit.poblacion.length != 0){
      valuesUpdate['poblacion'] = valueSubmit.poblacion
    }

    if (this.perfilForm.controls.correo.dirty) {
      valuesUpdate['correo'] = valueSubmit.correo
    }

    if (this.perfilForm.controls.imgUrl.dirty) {
      valuesUpdate['imgUrl'] = valueSubmit.imgUrl
    }
    console.log(valuesUpdate)
    let valuesUpdateSize = Object.keys(valuesUpdate).length;
    // console.log(valuesUpdateSize)

    if(valuesUpdateSize > 2){ // Comprobamos si el objeto que envia solo tiene 1 elemento, el token, es que no ha modificado nada, y mostramos mensaje
      this.psicologosService.updatePsicologo(valuesUpdate).then(res => {
        console.log(res)
        this.router.navigate([`inicio/${this.psicologoLogeado.numColeg}`])
      })
    }else{
      alert('Para actualizar debes modificar algun campo')
    }
  }

  // Método que elimina datos de la BD pulsando Eliminar Cuenta
  deletePsicologo() {
    this.psicologosService.deletePsicologo(this.token).then(res => {
      console.log(res)
      localStorage.removeItem('token')
      this.router.navigate([''])
    })
  }

  // Método que vuelve a la página de inicio/numColeg pulsando Cancelar
  inicioPsicologo() {
    this.router.navigate([`inicio/${this.psicologoLogeado.numColeg}`])
  }

  // Mostrar u ocultar las especialidades y poblacion para cambiarlo
  cambiarEsp() {
    if (!this.especialidades) {
      this.especialidades = true;
    } else {
      this.especialidades = false;
    }
  }

  cambiarPob() {
    if (!this.poblacion) {
      this.poblacion = true;
    } else {
      this.poblacion = false;
    }
  }
}
