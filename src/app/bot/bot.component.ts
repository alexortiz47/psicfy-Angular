import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BotService } from "../bot.service";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { Router, NavigationEnd } from "@angular/router";
import { CapitalizePipe } from '../capitalize.pipe';

@Component({
  selector: "app-bot",
  templateUrl: "./bot.component.html",
  styleUrls: ["./bot.component.css"],
  animations: [
    trigger("signal", [
      state(
        "active",
        style({
          bottom: "0px"
        })
      ),
      state(
        "inactive",
        style({
          bottom: "-370px"
        })
      ),
      transition("* => *", animate(500))
    ])
  ]
})
export class BotComponent implements OnInit {
  @ViewChild("inputMsg") inputMsg: ElementRef;

  answer: string;
  signalState: string;
  escribiendo: boolean;
  visible: boolean;

  constructor(private botService: BotService, private router: Router) {
    this.router.events.subscribe(val => { // Capturamos la url, y le decimos que si es una en concreto (/error404), que no muestre el bot mediante un *ngIf con la variable visible
      if (val instanceof NavigationEnd) {
        if (this.router.url == "/error404") {
          this.visible = false;
        } else {
          this.visible = true;
        }
      }
    });
    this.answer = "";
    this.signalState = "inactive";
    this.escribiendo = false;
  }

  ngOnInit() {}

  sendMsg(mensaje, $event) {
    if ($event.keyCode == 13) {
      $event.target.value = "";

      document.getElementById("chat").innerHTML =
        document.getElementById("chat").innerHTML +
        `<div class="row d-flex justify-content-end"><p style="background-color: #ddd" class="border rounded p-2">${mensaje}</p></div>`;

      document.getElementById("vistaChat").scrollBy(0, 400);

      this.escribiendo = true;

      this.botService.sendMensaje(mensaje).then(res => {
        // console.log(res)
        if (res["tipo"] === "search") {
          this.answer = res["mensaje"];
          let ul = document.createElement('ul')
          // ul.setAttribute('style', 'list-style:none')
          for(let psico of res['psicologos']) { // Recorremos el array de psicologos que nos llega desde node
            let nombre = new CapitalizePipe().transform(psico.nombre)
            let apellidos = new CapitalizePipe().transform(psico.apellidos)

            let li = document.createElement('li')

            li.addEventListener('click', ()=>{
              this.router.navigate(['/psico', psico.id])
            })

            li.innerHTML = `<a onMouseOver="this.style.color='#17a2b8'" onMouseOut="this.style.color='#212529'">${nombre} ${apellidos}</a>`
            ul.appendChild(li)
          }
          let divContainer = document.createElement('div')
          divContainer.setAttribute('class', 'row bg-white border px-3 py-1 mb-3')
          divContainer.innerHTML = `<p>${this.answer}</p>`
          divContainer.appendChild(ul)
          document.getElementById('chat').appendChild(divContainer)
          document.getElementById("vistaChat").scrollBy(0, 400);

          this.escribiendo = false;
        } else {
          this.answer = res["mensaje"];

          document.getElementById("chat").innerHTML = document.getElementById("chat").innerHTML + `<div class="row"><p class="bg-white border px-3 py-1">${this.answer}</p></div>`;

          document.getElementById("vistaChat").scrollBy(0, 400);

          this.escribiendo = false;
        }
      });
    }
  }

  handleLiClick($event){
    console.log('HOLA')
    return false
  }

  changeStatus() {
    this.signalState = this.signalState === "inactive" ? "active" : "inactive";
    this.inputMsg.nativeElement.focus(); // Le pone el foco al input
  }
}
