import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { PsicologosService } from "../psicologos.service";
import { EspecialidadesService } from "../especialidades.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

declare var google;

@Component({
  selector: "registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {

  @ViewChild("inputPlace") inputPlace: ElementRef;

  registroForm: FormGroup;
  arrEspecialidades: string[];
  arrPoblaciones: string[];
  arrIdEsp: number[];
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  urlImagen: string;
  lat: string
  lng: string
  dir: string

  constructor(
    private router: Router,
    private psicologosService: PsicologosService,
    private especialidadesService: EspecialidadesService,
    private storage: AngularFireStorage
  ) {
    this.arrEspecialidades = []
    this.arrPoblaciones = ["Infanto-Juvenil (0-16)", "Adultos (>16)"]
    this.arrIdEsp = [];
    this.urlImagen = ""
    this.lat = ""
    this.lng = ""
    this.dir = ""
  }

  ngOnInit() {
    this.especialidadesService.getAllEspecialidades().then(res => {
      // console.log(res)
      res.forEach(item => {
        this.arrEspecialidades.push(item.nombre);
        this.arrIdEsp.push(item.id);
      });
      // Creamos el formulario aqui porque es donde ya hemos recogido las especialidades de la BD
      this.registroForm = new FormGroup(
        {
          nombre: new FormControl("", [Validators.required]),
          apellidos: new FormControl("", [Validators.required]),
          numColeg: new FormControl("", [
            Validators.required
          ]),
          domicilio: new FormControl(''),
          especialidades: this.buildEspecialidades(),
          poblacion: this.buildPoblaciones(),
          correo: new FormControl("", [
            Validators.required,
            Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
          ]),
          correo_repeat: new FormControl(""),
          password: new FormControl("", [
            Validators.required,
            Validators.pattern(
              /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/
            )
          ]),
          password_repeat: new FormControl(""),
          imgUrl: new FormControl("")
        },
        [this.repeatPasswordValidator, this.repeatCorreoValidator]
      );
    });
  }

  ngAfterViewInit() {
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

  buildEspecialidades() {
    const values = this.arrEspecialidades.map(item => new FormControl(false));
    return new FormArray(values);
  }

  buildPoblaciones() {
    const values = this.arrPoblaciones.map(item => new FormControl(false));
    return new FormArray(values);
  }

  // Validaciones del registro
  repeatCorreoValidator(group: FormGroup) {
    let correo = group.controls["correo"].value;
    let correo_repeat = group.controls["correo_repeat"].value;

    return correo == correo_repeat ? null : { correo_repeat: "El correo no coincide" };
  }

  repeatPasswordValidator(group: FormGroup) {
    let password = group.controls["password"].value;
    let password_repeat = group.controls["password_repeat"].value;

    return password == password_repeat ? null : { password_repeat: "La contraseña no coincide" };
  }

  manejarRegistro() {
    // Metemos en el registro los valores de la img, y de la lat, lng y dir que nos devuelve google con el autocompletar
    if(this.urlImagen == '') {
      this.registroForm.value.imgUrl = 'https://firebasestorage.googleapis.com/v0/b/proyecto-final-neoland-aob.appspot.com/o/user.png?alt=media&token=fc1abec1-0175-4804-9686-580d1aeea607'
    }else{
      this.registroForm.value.imgUrl = this.urlImagen
    }

    this.registroForm.value.domicilio = this.dir
    this.registroForm.value.latitud = this.lat
    this.registroForm.value.longitud = this.lng

    let valueSubmit = Object.assign({}, this.registroForm.value);

    valueSubmit = Object.assign(valueSubmit, {
      especialidades: valueSubmit.especialidades
        .map((v, i) => (v ? this.arrIdEsp[i] : null))
        .filter(v => v !== null),
      poblacion: valueSubmit.poblacion
        .map((v, i) => (v ? this.arrPoblaciones[i].normalize("NFD") : null))
        .filter(v => v !== null)
        .join(", ")
    });
    this.psicologosService.doRegistro(valueSubmit).then(res => {
      // console.log(res);
      this.router.navigate([`/login`]);
    });
    // console.log(valueSubmit);
    this.registroForm.reset();
  }

  irLogin() {
    this.router.navigate(["/login"]);
  }

  onChangeImage($event) {
    let token =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const image = $event.target.files[0]; // Es un array porque con el file se pueden seleccionar mas de un archivo. Ponemos la pos 0 porque así seleccionamos siempre el primer elemento del array
    const filePath = `imagenes/${token}.jpg`; // Ruta dentro de firebase. Controlar nosotros el nombre del archivo con un generador de token por ejemplo
    const fileRef = this.storage.ref(filePath); // Referencia dentro de firebase
    const task = this.storage.upload(filePath, image); // Ejecucion para subir la img a firebase

    this.uploadPercent = task.percentageChanges(); // Observable que se ejecuta cuando cambia el porcentaje de subida de la imagen que estamos subiendo
    task
      .snapshotChanges()
      .pipe(
        // Indica cuando se ha terminado de subir la imagen. IMPORTANTE
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL(); // Nos devuelve la url de subida en firebase IMPORTANTE, es un observable
          this.downloadURL.subscribe(url => {
            console.log(url);
            this.urlImagen = url;
          });
        })
      )
      .subscribe();
  }
}
