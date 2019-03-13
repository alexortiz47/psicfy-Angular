import { Component, OnInit, ViewChild } from "@angular/core";
import { PsicologosService } from "../psicologos.service";
import { Psicologo } from "../models/psicologo.model";
import { EspecialidadesService } from "../especialidades.service";
import { Especialidad } from "../models/especialidad.model";

declare var google

@Component({
  selector: "cerca",
  templateUrl: "./cerca.component.html",
  styleUrls: ["./cerca.component.css"]
})
export class CercaComponent implements OnInit {
  arrPsico: Psicologo[];
  // arrEsp: Especialidad[]; // Para pintar el select de especialidades
  arrDatosPsico: any[];
  // arrFiltrado: any[];
  // poblacion: string;
  // especialidad: string;
  duracion: string
  distancia: string
  psicoSeleccionado: any
  desplazamiento: string
  start: any
  end: any

  @ViewChild('googleMap') gMap: any // Es el div donde va a estar nuestro mapa
  map: any // Este sera el mapa donde vamos a interactuar
  markers: any[] = [] // Creamos un array donde metemos todos los markers para tenerlos controlados
  directionsService: any
  directionsDisplay: any

  constructor(private psicologosService: PsicologosService, private especialidadesService: EspecialidadesService) {
    this.arrDatosPsico = [];
    this.psicologosService.getAllPsicologos().then(res => {
      // console.log(res)
      this.arrPsico = res;
      this.arrPsico.map(psico => {
        this.especialidadesService.getEspByPsicologo(psico.id).then(res => {
          // console.log(res)
          let datosPsico = {
            nombre: psico.nombre,
            apellidos: psico.apellidos,
            numColeg: psico.numColeg,
            especialidades: res,
            poblacion: psico.poblacion,
            domicilio: psico.domicilio,
            latitud: psico.latitud,
            longitud: psico.longitud,
            correo: psico.correo,
            imgUrl: psico.imgUrl
          };
          this.arrDatosPsico.push(datosPsico);
        });
      });
    });
    this.duracion = ''
    this.distancia = ''
    this.desplazamiento = 'DRIVING'
  }

  ngOnInit() {
    // console.log(this.gMap.nativeElement) // Accedemos al elemento que le hemos identificado en el html #googleMap
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.showError)
      // Devuelve la posicion en un momento determinado, cuando se lo pidamos
    } else {
      console.log('La cagamos, no se puede usar la geolocalización')
    }
  }

  showPosition(position) {
    // console.log(position)
    this.loadMap(position)
  }

  showError(error) {
    console.log(error.code)
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('El usuario no quiere ser localizado')
        break
      case error.POSITION_UNAVAILABLE:
        console.log('No se ha podido recuperar la posición')
        break
      case error.TIMEOUT:
        console.log('Se ha tardado demasiado en recuperar la localización')
        break
      case error.UNKNOWN_ERROR:
        console.log('Error desconocido')
        break
    }
  }

  loadMap(position) { // Generamos el mapa con las propiedades que espera google: center, zoom, mapTypeId(estilo de mapa). Aqui haremos todo con respecto al mapa
    this.directionsService = new google.maps.DirectionsService()
    this.directionsDisplay = new google.maps.DirectionsRenderer()

    let propsMap = { // Son las propiedades del mapa
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), // posicion actual
      zoom: 11,
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.gMap.nativeElement, propsMap) // Creamos el mapa de google, como primer parametro le pasamos el div donde va a ir y como segundo las propiedades del mapa de goolge

    this.directionsDisplay.setMap(this.map)

    let marker = new google.maps.Marker({
      position: propsMap.center, // Es el mismo que el de arriba, no hace falta que repitamos
      map: this.map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      animation: google.maps.Animation.DROP
    })
    this.markers.push(marker)

    let self = this

    this.arrDatosPsico.map(psico => {

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(psico.latitud, psico.longitud),
        map: this.map,
        title: psico.nombre,
        animation: google.maps.Animation.DROP
      })

      marker.addListener('click', function() {
        // infowindow.open(this.map, marker);
        self.start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        self.end = new google.maps.LatLng(psico.latitud, psico.longitud)
        self.generateRoute(self.start, self.end)
        self.psicoSeleccionado = psico
        // console.log(self.psicoSeleccionado)
      });
      marker.setMap(this.map)
    })
  }

  generateRoute(start, end) {
    let requestOpts = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode[this.desplazamiento]
    }

    let self = this

    this.directionsService.route(requestOpts, (result) => {
      // console.log(result)
      self.directionsDisplay.setOptions({suppressMarkers: true});
      self.directionsDisplay.setDirections(result)
      this.duracion = result.routes[0].legs[0].duration.text
      this.distancia = result.routes[0].legs[0].distance.text
    })
  }

  handleChangeRouteType(pTipo) {
    this.desplazamiento = pTipo
    this.generateRoute(this.start, this.end)
  }
}
