import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { PsicologosService } from "../psicologos.service";
import { Psicologo } from "../models/psicologo.model";
import { EspecialidadesService } from "../especialidades.service";
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'

declare var google;

@Component({
  selector: "app-logeado",
  templateUrl: "./logeado.component.html",
  styleUrls: ["./logeado.component.css"]
})
export class LogeadoComponent implements OnInit {

  @ViewChild("inputPlace") inputPlace: ElementRef;

  especialidades: boolean;
  poblacion: boolean;

  perfilForm: FormGroup;

  arrEspecialidades: string[];
  arrPoblaciones: string[];
  arrIdEsp: number[];
  arrEspPsicologo: any[];

  token: string;
  psicologoLogeado: Psicologo;

  uploadPercent: Observable<number>
  downloadURL: Observable<string>
  urlImagen: string
  lat: string
  lng: string
  dir: string

  constructor(private router: Router, public psicologosService: PsicologosService, private especialidadesService: EspecialidadesService, private storage: AngularFireStorage) {
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
    this.urlImagen = ""
    this.lat = ""
    this.lng = ""
    this.dir = ""
  }

  ngOnInit(){
  }

  // Metodo que se ejecuta despues del ngOnInit
  ngAfterViewInit() {
    // Ponemos un TimeOut para darle un poco de tiempo
    setTimeout(() => {
      let options = {
        componentRestrictions: {
          country: "es"
        }
      }
      // console.log(this.inputPlace.nativeElement);
      let input = this.inputPlace.nativeElement
      let autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.setFields(["address_components", "formatted_address", "geometry", "icon", "name"]);

      autocomplete.addListener("place_changed", () => {
        let place = autocomplete.getPlace();
        // console.log(place);
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        // console.log(this.lat);
        // console.log(this.lng);
        this.dir = place.formatted_address
        // console.log(this.dir)
      });
    }, 700);
  }

  // Método que crea el formulario
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
          domicilio: new FormControl(''),
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

    return correo == correo_repeat ? null : { correo_repeat: "El correo no coincide" };
  }

  // Construcción de Checkboxes de Especialidades y población:
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
    this.perfilForm.value.imgUrl = this.urlImagen
    this.perfilForm.value.domicilio = this.dir
    this.perfilForm.value.latitud = this.lat
    this.perfilForm.value.longitud = this.lng

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

    if (this.perfilForm.controls.domicilio) {
      valuesUpdate['domicilio'] = valueSubmit.domicilio
    }

    if (this.perfilForm.controls.latitud) {
      valuesUpdate['latitud'] = valueSubmit.latitud
    }

    if (this.perfilForm.controls.longitud) {
      valuesUpdate['longitud'] = valueSubmit.longitud
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

  // Método que identifica cuando se carga una nueva imagen de usuario
  onChangeImage($event) {
    let token =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const image = $event.target.files[0] // Es un array porque con el file se pueden seleccionar mas de un archivo. Ponemos la pos 0 porque así seleccionamos siempre el primer elemento del array
    const filePath = `imagenes/${token}.jpg`; // Ruta dentro de firebase. Controlar nosotros el nombre del archivo con un generador de token por ejemplo
    const fileRef = this.storage.ref(filePath); // Referencia dentro de firebase
    const task = this.storage.upload(filePath, image); // Ejecucion para subir la img a firebase

   this.uploadPercent = task.percentageChanges(); // Observable que se ejecuta cuando cambia el porcentaje de subida de la imagen que estamos subiendo
   task.snapshotChanges().pipe( // Indica cuando se ha terminado de subir la imagen. IMPORTANTE
       finalize(() => {
         this.downloadURL = fileRef.getDownloadURL() // Nos devuelve la url de subida en firebase IMPORTANTE, es un observable
         this.downloadURL.subscribe(url => {
          //  console.log(url)
           this.urlImagen = url
         })
       })
    ).subscribe()
  }
}
